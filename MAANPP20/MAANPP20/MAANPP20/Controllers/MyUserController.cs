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
using MAANPP20.Models.Flights;

namespace MAANPP20.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyUserController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        private readonly ApplicationSettings _applicationSettings;

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
            Console.WriteLine("Stigao do post register!!!!!");

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
    }
}