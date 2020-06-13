using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using MAANPP20.Data;
using MAANPP20.FlightRepositories;
using MAANPP20.Models.Common;
using MAANPP20.Models.Flights;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MAANPP20.Controllers.Flights
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightReservationController : ControllerBase
    {
        private FlightReservationRepo flightReservationRepo = new FlightReservationRepo();
        private readonly MAANPP20Context _context;
        public FlightReservationController(MAANPP20Context context)
        {
            _context = context;
        }

        // GET: api/FlightReservation/546tr76f
        [HttpGet("{idUser}")]
        public async Task<ActionResult<IEnumerable<FlightReservation>>> GetFlightReservations(string idUser)
        {
            return await flightReservationRepo.GetFlightReservations(_context, idUser);
            //return await _context.FlightReservations
            //    .Where(x => x.deleted == false)
            //    .Where(usersId => usersId.UserIdForPOST == idUser)
            //    .ToListAsync();
        }

        [HttpPost]
        [Route("Reserve")]
        public async Task<ActionResult<FlightReservation>> AddFlightReservation(FlightReservation flightReservation)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (ValidateModel(flightReservation, true))
            {
                var flightReservationRet = await flightReservationRepo.AddFlightReservation(_context, flightReservation);
                if (flightReservationRet == null) return BadRequest();
                return Ok();
                //User user = await _context.Users.Where(x => x.deleted == false)
                //    .Include(flightReservations => flightReservations.flightReservations)
                //    .FirstOrDefaultAsync(id => id.Id == flightReservation.UserIdForPOST);

                //if (user == null) return BadRequest();

                //AvioSediste avioSediste = await _context.AvioSedista
                //    .Where(x => x.deleted == false)
                //    .FirstOrDefaultAsync(id => id.id == flightReservation.seatId);
                //if (avioSediste == null) return BadRequest();
                //if (avioSediste.isFastReservation == true) return BadRequest();
                //if (avioSediste.deleted == true) return BadRequest();
                //if (avioSediste.reserved == true) return BadRequest();
                //avioSediste.reserved = true;
                ////_context.Entry(avioSediste).State = EntityState.Modified;

                //foreach (var friend in flightReservation.friendForFlights)
                //{
                //    AvioSediste avioSediste1 = await _context.AvioSedista
                //    .Where(x => x.deleted == false)
                //    .FirstOrDefaultAsync(id => id.id == friend.seatId);
                //    if (avioSediste1 == null) return BadRequest();
                //    if (avioSediste1.isFastReservation == true) return BadRequest();
                //    if (avioSediste1.deleted == true) return BadRequest();
                //    if (avioSediste1.reserved == true) return BadRequest();
                //    avioSediste1.reserved = true;
                //    //_context.Entry(avioSediste1).State = EntityState.Modified;
                //}
                //bool saveFailed;
                //do
                //{
                //    saveFailed = false;
                //    try
                //    {
                //        _context.SaveChanges();
                //    }
                //    catch (DbUpdateConcurrencyException ex)
                //    {
                //        saveFailed = true;
                //        return Conflict();
                //    }
                //    catch (Exception e)
                //    {

                //        throw;
                //    }
                //} while (saveFailed);

                //foreach (var friendForFlight in flightReservation.friendForFlights)
                //{
                //    friendForFlight.invitationString = RandomString();
                //}

                //user.flightReservations.Add(flightReservation);
                //// ako je user iskoristion svoj bonus
                //if (flightReservation.userBonus == true)
                //{
                //    user.bonus = 0;
                //}
                //else
                //{
                //    // ako nije, proverava se da li je dosao do 100%?
                //    if (user.bonus < 100)
                //    {
                //        user.bonus += 1;
                //    }
                //}

                //try
                //{
                //    _context.Entry(user).State = EntityState.Modified;
                //}
                //catch (Exception e)
                //{

                //    throw;
                //}

                //_context.FlightReservations.Add(flightReservation);



                //try
                //{
                //    //if (SendMail(flightReservation.friendForFlights as List<FriendForFlight>))
                //        await _context.SaveChangesAsync();
                //    //else BadRequest();
                //}
                //catch (Exception e)
                //{

                //    throw;
                //}
                ////await _context.SaveChangesAsync();

                //return Ok();
            }
            else return BadRequest();
        }

        // PUT: api/FlightReservation
        [HttpPut]
        public async Task<IActionResult> UpdateFlightReservation(FlightReservation flightReservation)
        {
            var flightReservationRet = await flightReservationRepo.UpdateFlightReservation(_context, flightReservation);
            if (flightReservationRet == null) return NotFound();
            return Ok();
            //Flight flight = await _context.Flights.Where(x => x.deleted == false)
            //        .Include(ocene => ocene.ocene)
            //        .FirstOrDefaultAsync(id => id.id == flightReservation.flightId);
            //if (flight == null) return BadRequest();
            //if (flightReservation.ocenaLeta > 0)
            //{
            //    DoubleForICollection doubleForICollection = new DoubleForICollection();
            //    doubleForICollection.DoubleValue = flightReservation.ocenaLeta;
            //    flight.ocene.Add(doubleForICollection);
            //    _context.Entry(flight).State = EntityState.Modified;
            //}

            //if (flightReservation.ocenaKompanije > 0)
            //{
            //    FlightCompany flightCompany = await _context.FlightCompanies.Where(x => x.deleted == false)
            //        .Include(ocene => ocene.ocene)
            //        .FirstOrDefaultAsync(id => id.id == flight.idCompany);
            //    if (flightCompany == null) return BadRequest();
            //    DoubleForICollection doubleForICollection = new DoubleForICollection();
            //    doubleForICollection.DoubleValue = flightReservation.ocenaKompanije;
            //    flightCompany.ocene.Add(doubleForICollection);
            //    _context.Entry(flightCompany).State = EntityState.Modified;
            //}

            //_context.Entry(flightReservation).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!FlightReservationExists(flightReservation.id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return Ok();
        }

        // DELETE: api/FlightReservation/DeleteFR/1
        [HttpDelete]
        [Route("DeleteFR/{id}")]
        public async Task<ActionResult<FlightReservation>> DeleteFlightReservation(int id)
        {
            var flightReservation = await flightReservationRepo.DeleteFlightReservation(_context, id);
            if (flightReservation == null) return NotFound();
            return Ok();
            //var flightReservation = await _context.FlightReservations
            //    .Where(x => x.deleted == false)
            //    .FirstOrDefaultAsync(i => i.id == id);
            //if (flightReservation == null)
            //{
            //    return NotFound();
            //}
            //else if (flightReservation.deleted == true)
            //{
            //    return NotFound();
            //}

            //AvioSediste avioSediste = await _context.AvioSedista
            //        .Where(x => x.deleted == false)
            //        .FirstOrDefaultAsync(id => id.id == flightReservation.seatId);
            //if (avioSediste == null) return BadRequest();
            //if (avioSediste.isFastReservation == true) return BadRequest();
            //if (avioSediste.deleted == true) return BadRequest();
            //if (avioSediste.reserved == false) return BadRequest();
            //avioSediste.reserved = false;
            //_context.Entry(avioSediste).State = EntityState.Modified;

            //flightReservation.deleted = true;

            //_context.Entry(flightReservation).State = EntityState.Modified;

            //await _context.SaveChangesAsync();

            //return Ok();
        }

        private bool FlightReservationExists(int id) => _context.FlightReservations.Any(e => e.id == id);

        private bool ValidateModel(FlightReservation flightReservation, bool isPost)
        {
            if (flightReservation.ocenaLeta < 0 && isPost == true) return false;
            if (flightReservation.ocenaKompanije < 0 && isPost == true) return false;
            if (flightReservation.flightId < 1) return false;
            if (flightReservation.UserIdForPOST == null || flightReservation.UserIdForPOST == "") return false;
            if (flightReservation.price <= 0) return false;
            if (flightReservation.seatNumeration <= 0) return false;

            return true;
        }

        private bool SendMail(List<FriendForFlight> friendForFlights)
        {
            foreach (var friendForFlight in friendForFlights)
            {
                string to = "andrej.km997@gmail.com";
                string from = "andrej.km997@gmail.com";
                string subject = "Poziv za let";
                string body = $"Postovani {friendForFlight.prezime} {friendForFlight.ime},\n" +
                    $"Pozvani ste na let\n" +
                    $"\n" +
                    $"Kliknite na link http://localhost:4200/invitation kako biste pristupili stranici " +
                    $"za prihavatanje ili odbijanje ponude.";
                using (MailMessage mailMessage = new MailMessage(from, to, subject, body))
                {
                    try
                    {
                        using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587))
                        {
                            smtpClient.EnableSsl = true;
                            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                            smtpClient.UseDefaultCredentials = false;
                            smtpClient.Credentials = new NetworkCredential(from, "kscuugcirljlecre");
                            smtpClient.Send(mailMessage);
                        }
                    }
                    catch (Exception e)
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        private async Task<bool> Check(string invitationString)
        {
            FriendForFlight friendForFlight = await _context.FriendForFlights
                .FirstOrDefaultAsync(x => x.invitationString == invitationString);
            if (friendForFlight == null) return true;
            return false;
        }

        // rekurzivno trazenje da li postoji vec takav invitations string
        private string RandomString()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string str = new string(Enumerable.Repeat(chars, 10)
              .Select(s => s[random.Next(s.Length)]).ToArray());
            if (!this.Check(str).Result)
                RandomString();
            return str;
        }

        [HttpPost]
        [Route("Accept")]
        public async Task<IActionResult> AcceptFriendForFlight(StringForICollection invitationString)
        {
            var friendForFlight = await flightReservationRepo.AcceptFriendForFlight(_context, invitationString);
            if (friendForFlight == null) return BadRequest();
            return Ok();
            //var friendForFlight = await _context.FriendForFlights
            //    .Where(x => x.deleted == false)
            //    .FirstOrDefaultAsync(x => x.invitationString == invitationString.PlainString);
            //if (friendForFlight == null) return BadRequest();

            //return Ok();
        }

        [HttpDelete]
        [Route("Decline/{invitationString}")]
        public async Task<IActionResult> DeclineFriendForFlight(string invitationString)
        {
            var friendForFlight = await flightReservationRepo.DeclineFriendForFlight(_context, invitationString);
            if (friendForFlight == null) return NotFound();
            return Ok();
            //var friendForFlight = await _context.FriendForFlights
            //    .Where(x => x.deleted == false)
            //    .FirstOrDefaultAsync(x => x.invitationString == invitationString);
            //if (friendForFlight == null) return BadRequest();
            //if (friendForFlight.deleted == true) return BadRequest();

            //var seat = await _context.AvioSedista
            //    .Where(x => x.reserved == true)
            //    .FirstOrDefaultAsync(x => x.id == friendForFlight.seatId);
            //if (seat == null) return BadRequest();
            //seat.reserved = false;
            //_context.Entry(seat).State = EntityState.Modified;

            //friendForFlight.deleted = true;
            //_context.Entry(friendForFlight).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (Exception e)
            //{

            //    throw;
            //}

            //return Ok();
        }

        // GET: api/FlightReservation/Called
        [HttpGet("Called/{email}")]
        public async Task<ActionResult<IEnumerable<FriendForFlight>>> GetCallsForFlight(string email)
        {
            var friendForFlight = await flightReservationRepo.GetCallsForFlight(_context, email);
            if (friendForFlight == null) return NotFound();
            return friendForFlight;
            //var user = await _context.Users.Where(x => x.deleted == false)
            //    .FirstOrDefaultAsync(i => i.Email == email);

            //if (user == null) return BadRequest();

            //var friendForFlight = await _context.FriendForFlights
            //    .Where(x => x.deleted == false && x.email == email && x.ime == user.firstName && x.prezime == user.lastName)
            //    .ToListAsync();
            //if (friendForFlight == null) return BadRequest();

            //return friendForFlight;
        }

        [HttpGet("Statistics/{idFlight}")]
        public async Task<ActionResult<IEnumerable<FlightReservation>>> GetFlightReservationsStatistics(int idFlight)
        {
            return await flightReservationRepo.GetFlightReservationsStatistics(_context, idFlight);
            //return await _context.FlightReservations
            //    .Where(x => x.deleted == false)
            //    .Where(id => id.flightId == idFlight)
            //    .ToListAsync();
        }
    }
}