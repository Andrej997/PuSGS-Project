using MAANPP20.Data;
using MAANPP20.Models.Common;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Controller;
using System;
using System.Text;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.IO;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Net.Http;
using Newtonsoft.Json;
using System.Net;
using System.Net.Mail;
using MAANPP20.Models.Flights;

namespace MAANPP20.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyUserController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        private readonly ApplicationSettings _applicationSettings;
        private static Random random;

        public MyUserController(IOptions<ApplicationSettings> applicationSettings, MAANPP20Context context )
        {
            _context = context;
            _applicationSettings = applicationSettings.Value;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/User/Register
        public async Task<Object> PostRegisterUser(UserModel model)
        {
            var tmpUser = await _context.Users
                .Include(address => address.address)
                .Include(friends => friends.friends)
                .Include(friendRequests => friendRequests.friendRequests)
                .FirstOrDefaultAsync(i => i.Email == model.Email);

            if(tmpUser != null)
            {
                return BadRequest(new { message = "Vec postoji korisnik sa istim email-om." });
            }

            var adr = new Address();
            adr.streetAndNumber = model.StreetAndNumber;
            adr.city = model.City;
            adr.country = model.Country;
            string decryptedPassword = "";
            string hashMessage = "";

            decryptedPassword = DecryptStringAES(model.Password);

            using ( SHA256 sha256 = SHA256.Create())
            {
                hashMessage = GetHash(sha256, decryptedPassword);
            }

            var user = new User()
            {
                firstName = model.FirstName,
                lastName = model.LastName,
                Email = model.Email,
                PasswordHash = hashMessage,
                profileImage = model.ProfileImage,
                address = adr,
                PhoneNumber = model.PhoneNumber,
                role = GetRole(model.RoleRole),
                passportHash = model.PassportNumber
            };
            user.serviceId = 0;
            user.friendRequests = new List<FriendRequest>();
            user.friends = new List<Friend>();
            user.fastFlightReservations = new List<FastFlightReservation>();
            user.flightReservations = new List<FlightReservation>();
            user.bonus = 0;
            try
            {
                user.role = Role.adminA;
                user.EmailConfirmed = false;
                int randNumber = SendActivationCode();
                user.activationCode = randNumber.ToString();
                _context.Users.Add(user);
                int result = await _context.SaveChangesAsync(); //ako ne sacuvamo dzabe smo krecili
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("SocialRegister")]
        public async Task<IActionResult> SocialRegister([FromBody]LoginModel loginModel)
        {
            var test = _applicationSettings.JWT_Secret;
            bool uspesno = true;
            bool isFb = false;
            string token = "";

            if (loginModel.IdToken != null)
            {
                token = loginModel.IdToken;
            }
            else
            {
                token = loginModel.authToken;
                isFb = true;
            }
            if (VerifyToken(token, isFb))
            {
                var tmpUser = await _context.Users
                    //.Include(address => address.address)
                    //.Include(friends => friends.friends)
                    //.Include(friendRequests => friendRequests.friendRequests)
                    .FirstOrDefaultAsync(i => i.Email == loginModel.email);
                if (tmpUser != null)
                {

                    return BadRequest(new { message = "Vec postoji korisnik sa istim email-om." });
                }
                var user = new User()
                {
                    UserName = loginModel.name,
                    firstName = loginModel.firstName,
                    lastName = loginModel.lastName,
                    Email = loginModel.email,
                    role = Role.registredUser
                };
                user.EmailConfirmed = false;
                int randNumber = SendActivationCode();
                user.activationCode = randNumber.ToString();
                _context.Users.Add(user);
                int result = await _context.SaveChangesAsync();

                return Ok(new { uspesno });
            }
            uspesno = false;
            return Ok(new { uspesno });
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/MyUser/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            string hashMessage;
            var user = await _context.Users
                //.Include(address => address.address)
                //.Include(friends => friends.friends)
                //.Include(friendRequests => friendRequests.friendRequests)
                .FirstOrDefaultAsync(i => i.Email == model.email);

            using (SHA256 sha256 = SHA256.Create())
            {
                hashMessage = GetHash(sha256, model.password);
            }

            if (user != null && (user.PasswordHash == hashMessage))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim("Roles", user.role.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_applicationSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new Token_plus_User(){ User = user, Token = token });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }
        public static int SendActivationCode()
        {
            random = new Random();
            int randNumber = random.Next(100001, 999999);
            string to = "andrej.km997@gmail.com";
            string from = "andrej.km997@gmail.com";
            MailMessage message = new MailMessage(from, to);
            message.Subject = "Aktivacioni kod";
            //message.Body = @"Using this new feature, you can send an email message from an application very easily.";
            message.Body = "Vas aktivacioni kod je: " + randNumber.ToString();
            try
            {
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
                smtpClient.EnableSsl = true;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                //smtpClient.UseDefaultCredentials = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(from, "kscuugcirljlecre");
                smtpClient.Send(message);
                //smtpClient.Send(message.From.ToString(), message.To.ToString(), message.Subject, message.Body);
            }
            catch(Exception ex)
            {
                Console.WriteLine("Ex: " + ex);
            }
            return randNumber;
        }

        
        [HttpPost]
        [Route("SocialLogin")]
        // POST: api/<controller>/Login
        public async Task<IActionResult> SocialLogin([FromBody]LoginModel loginModel)
        {
            var tmpUser = await _context.Users
                    .FirstOrDefaultAsync(i => i.Email == loginModel.email);
            var test = _applicationSettings.JWT_Secret;

            if(tmpUser == null)
            {
                return BadRequest(new { message = "Ne postoji takav korisnik." });
            }

            if (tmpUser.PasswordHash != null)
            {
                return BadRequest(new { message = "Ne mozete se ulogovati na ovaj nacin, popunite odgovarajuca polja." });
            }

            string tmpToken = "";
            bool isFb = false;

            if (loginModel.IdToken != null)
            {
                tmpToken = loginModel.IdToken;
            }
            else
            {
                tmpToken = loginModel.authToken;
                isFb = true;
            }

            if (VerifyToken(tmpToken, isFb))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", tmpUser.Id.ToString()),
                        new Claim("Roles", tmpUser.role.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(5),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_applicationSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new Token_plus_User() { User = tmpUser, Token = token });
            }   
            return Ok();
        }

        public class Token_plus_User
        {
            public string Token { get; set; }
            public User User { get; set; }

        }

        // GET: api/MyUser
        [HttpGet]
        [Route("GetUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users
                .Include(address => address.address)
                .Include(friends => friends.friends)
                .Include(friendRequests => friendRequests.friendRequests)
                .ToListAsync();
        }

        // GET: api/MyUser/1s231-12sf23...
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;

            var user = await _context.Users
                .Include(address => address.address)
                .Include(friends => friends.friends)
                .Include(friendRequests => friendRequests.friendRequests)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(User user)
        {
            /*
             Na front stigne slika, ali je prazna??? 
             Ne mogu da provalim zasto se to desava,
             to moze da se izbegne tako sto ce se ovde izvuci 
             user iz baze preko id-a koji je u ovom user-u iz 
             parametra i samo upisati sliku i sacuvati...
             Nzm kako si resio to za password pa mozes dodati.
             */
            //if (user.profileImage == null || user.profileImage == "")
            //    _context.Entry(user.profileImage).State = EntityState.Unchanged;

            //_context.Entry(user.PasswordHash).State = EntityState.Detached;

            _context.Entry(user.address).State = EntityState.Modified;
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.Id.ToString()))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        [HttpPut]
        [Route("EmailConfirmed")]
        public async Task<IActionResult> EmailConfirmed(LoginModel model)
        {
            string hashMessage = "";
            User tmpUser = await _context.Users
                   .FirstOrDefaultAsync(i => i.Email == model.email);

            if(tmpUser != null)
            {
                tmpUser.EmailConfirmed = true;
                _context.Entry(tmpUser).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim("UserID",tmpUser.Id.ToString()),
                    new Claim("Roles", tmpUser.role.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_applicationSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new Token_plus_User() { User = tmpUser, Token = token });
            }
            else
            {
                return BadRequest(new { message = "Ne postoji korisnik sa takvim e-mailom." });
            }
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(User user)
        {
            //_context.Entry(user.address).State = EntityState.Modified;
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.Id.ToString()))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();
        }
        private bool UserExists(string id) => _context.Users.Any(e => e.Id == id);

        private string GetHash(SHA256 sha256, string password)
        {
            // Convert the input string to a byte array and compute the hash.
            byte[] data = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            var sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }

        public Role GetRole(string r)
        {
            Role ret = new Role();

            switch (r)
            {
                case "admin":
                    {
                        ret = Role.admin;
                        break;
                    }
                case "adminA":
                    {
                        ret = Role.adminA;
                        break;
                    }
                case "adminM":
                    {
                        ret = Role.adminM;
                        break;
                    }
                case "registredUser":
                    {
                        ret = Role.registredUser;
                        break;
                    }
                default:
                    {
                        ret = Role.user;
                        break;
                    }
            }
            return ret;
        }

        private static string DecryptStringFromBytes(byte[] cipherText, byte[] key, byte[] iv)
        {
            // Check arguments.  
            if (cipherText == null || cipherText.Length <= 0)
            {
                throw new ArgumentNullException("cipherText");
            }
            if (key == null || key.Length <= 0)
            {
                throw new ArgumentNullException("key");
            }
            if (iv == null || iv.Length <= 0)
            {
                throw new ArgumentNullException("key");
            }

            // Declare the string used to hold  
            // the decrypted text.  
            string plaintext = null;

            // Create an RijndaelManaged object  
            // with the specified key and IV.  
            using (var rijAlg = new RijndaelManaged())
            {
                //Settings  
                rijAlg.Mode = CipherMode.CBC;
                rijAlg.Padding = PaddingMode.PKCS7;
                rijAlg.FeedbackSize = 128;

                rijAlg.Key = key;
                rijAlg.IV = iv;

                // Create a decrytor to perform the stream transform.  
                var decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);

                try
                {
                    // Create the streams used for decryption.  
                    using (var msDecrypt = new MemoryStream(cipherText))
                    {
                        using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {

                            using (var srDecrypt = new StreamReader(csDecrypt))
                            {
                                // Read the decrypted bytes from the decrypting stream  
                                // and place them in a string.  
                                plaintext = srDecrypt.ReadToEnd();

                            }

                        }
                    }
                }
                catch
                {
                    plaintext = "keyError";
                }
            }

            return plaintext;
        }

        public static string DecryptStringAES(string cipherText)
        {
            var keybytes = Encoding.UTF8.GetBytes("8080808080808080");
            var iv = Encoding.UTF8.GetBytes("8080808080808080");

            var encrypted = Convert.FromBase64String(cipherText);
            var decriptedFromJavascript = DecryptStringFromBytes(encrypted, keybytes, iv);
            return string.Format(decriptedFromJavascript);
        }

        private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";
        public bool VerifyToken(string providerToken, bool isFb)
        {
            HttpResponseMessage httpResponseMessage;
            var httpClient = new HttpClient();
            //string app_id = "249628966112878"; //EAADjCUXZAzm4BAFhfZAlPpT2d7DFALxrhVVdmNpsQk7dOQZAi78CKZCSXAFA5NiDwFuEQdZBR276QvIWJuUQyo2sFajqR9ZBa1aQcs3TDlMv5AnuAqpzYvrvcb4laHzT7f22q9hYixYDgBVT7qhILaaqUZB8sTgFkHlwItEw16lqYZBaKh5Tck9vkG6UNYB6ZBNeTZA44sqFW2owZDZD
            //string app_secret = "EAADjCUXZAzm4BALzTZBoJl3NhQbnF9aDRl8DZBz6561TzZCafKRaIdO9YdwPsp5WTB2cpVlytf2UOxaigZA6zbGIuv5Bt9ZB9nO6KH2fTZBfu8GzO46lyGZAV3wqyjEZAxcMrUUUQauHcUkWFezGLpSWBSKiWlfUyZBjezPHjwZAS86o97kTaCCHZAQsEVvEZA9OiykIZD";
            //string app_secret = "EAADjCUXZAzm4BAFhfZAlPpT2d7DFALxrhVVdmNpsQk7dOQZAi78CKZCSXAFA5NiDwFuEQdZBR276QvIWJuUQyo2sFajqR9ZBa1aQcs3TDlMv5AnuAqpzYvrvcb4laHzT7f22q9hYixYDgBVT7qhILaaqUZB8sTgFkHlwItEw16lqYZBaKh5Tck9vkG6UNYB6ZBNeTZA44sqFW2owZDZD";
            string app_secret = "EAADjCUXZAzm4BAPtphxLiJ5TgxcRWSHdQ2Bo6ZA4PwCiaOTouxVr4c9bcyfI0SLAZA4wzIa0ZC1Vn5anaZBcG6C5r2sFCAp3fqdrqybnnqh4HsON8pwJXAhvNs1WHh05YkW1Cmf9SmViXaCxbXdyehXBd4JmT64RyUMHfugQsmpAgzTFxgejlmmE6VsnNHwZCAH4T70jTp5ZCZBiTP8SCBEJsITBSPy3plAbArLiZBQwrnQZDZDa";
            //EAADjCUXZAzm4BAMIT1ezeTjPWaKpVwLZAF3GnxCoIPHNPx5Da0zhywZCgWbZCCLaKEBdjZC3k0AgBfccl98v8jYUADbRxyxyhjZBRqTtjYQJbLy2ZAyix1DK5imZANc1xKI60Qa90DRZBum3xQZBqKvc0ydZCSGkfCOyxUOLmcE0VAyY5Fjt8K618CmtG0VndPPNDIZD
            //string FacebookApiTokenInfoUrl = "https://graph.facebook.com/debug_token?input_token=" + providerToken + "&access_token=" + app_id + "|" + app_secret;
            string FacebookApiTokenInfoUrl = " https://graph.facebook.com/me?access_token=" + app_secret;
            Uri requestUri;

            if (isFb)
                requestUri = new Uri(FacebookApiTokenInfoUrl);
            else
                requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, providerToken));

            try
            {
                httpResponseMessage = httpClient.GetAsync(requestUri).Result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }

            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);

            return true;
        }
    }
}