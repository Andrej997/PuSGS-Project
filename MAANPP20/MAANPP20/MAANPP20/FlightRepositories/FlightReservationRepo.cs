using MAANPP20.Data;
using MAANPP20.FlightInterfaces;
using MAANPP20.Models.Common;
using MAANPP20.Models.Flights;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace MAANPP20.FlightRepositories
{
    public class FlightReservationRepo : IFlightReservation
    {
        public async Task<ActionResult<FlightReservation>> AddFlightReservation(MAANPP20Context _context, FlightReservation flightReservation)
        {
            User user = await _context.Users.Where(x => x.deleted == false)
                    .Include(flightReservations => flightReservations.flightReservations)
                    .FirstOrDefaultAsync(id => id.Id == flightReservation.UserIdForPOST);

            if (user == null) return null;

            AvioSediste avioSediste = await _context.AvioSedista
                .Where(x => x.deleted == false)
                .FirstOrDefaultAsync(id => id.id == flightReservation.seatId);
            if (avioSediste == null) return null;
            if (avioSediste.isFastReservation == true) return null;
            if (avioSediste.deleted == true) return null;
            if (avioSediste.reserved == true) return null;
            avioSediste.reserved = true;
            //_context.Entry(avioSediste).State = EntityState.Modified;

            foreach (var friend in flightReservation.friendForFlights)
            {
                AvioSediste avioSediste1 = await _context.AvioSedista
                .Where(x => x.deleted == false)
                .FirstOrDefaultAsync(id => id.id == friend.seatId);
                if (avioSediste1 == null) return null;
                if (avioSediste1.isFastReservation == true) return null;
                if (avioSediste1.deleted == true) return null;
                if (avioSediste1.reserved == true) return null;
                avioSediste1.reserved = true;
                //_context.Entry(avioSediste1).State = EntityState.Modified;
            }
            bool saveFailed;
            do
            {
                saveFailed = false;
                try
                {
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    saveFailed = true;
                    return null;
                }
                catch (Exception e)
                {

                    throw;
                }
            } while (saveFailed);

            foreach (var friendForFlight in flightReservation.friendForFlights)
            {
                friendForFlight.invitationString = RandomString(_context);
                friendForFlight.reservationDate = DateTime.Now;
            }

            user.flightReservations.Add(flightReservation);
            // ako je user iskoristion svoj bonus
            if (flightReservation.userBonus == true)
            {
                user.bonus = 0;
            }
            else
            {
                // ako nije, proverava se da li je dosao do 100%?
                if (user.bonus < 100)
                {
                    user.bonus += 1;
                }
            }

            try
            {
                _context.Entry(user).State = EntityState.Modified;
            }
            catch (Exception e)
            {

                throw;
            }

            _context.FlightReservations.Add(flightReservation);



            try
            {
                SendMail(flightReservation.friendForFlights as List<FriendForFlight>);
                await _context.SaveChangesAsync();
                //else BadRequest();
            }
            catch (Exception e)
            {
                return null;
            }
            //await _context.SaveChangesAsync();

            return flightReservation;
        }

        public async Task<ActionResult<IEnumerable<FlightReservation>>> GetFlightReservations(MAANPP20Context _context, string idUser)
        {
            return await _context.FlightReservations
               .Where(x => x.deleted == false)
               .Where(usersId => usersId.UserIdForPOST == idUser)
               .ToListAsync();
        }

        public async Task<FlightReservation> UpdateFlightReservation(MAANPP20Context _context, FlightReservation flightReservation)
        {
            Flight flight = await _context.Flights.Where(x => x.deleted == false)
                    .Include(ocene => ocene.ocene)
                    .FirstOrDefaultAsync(id => id.id == flightReservation.flightId);
            if (flight == null) return null;
            if (flightReservation.ocenaLeta > 0)
            {
                DoubleForICollection doubleForICollection = new DoubleForICollection();
                doubleForICollection.DoubleValue = flightReservation.ocenaLeta;
                flight.ocene.Add(doubleForICollection);
                _context.Entry(flight).State = EntityState.Modified;
            }

            if (flightReservation.ocenaKompanije > 0)
            {
                FlightCompany flightCompany = await _context.FlightCompanies.Where(x => x.deleted == false)
                    .Include(ocene => ocene.ocene)
                    .FirstOrDefaultAsync(id => id.id == flight.idCompany);
                if (flightCompany == null) return null;
                DoubleForICollection doubleForICollection = new DoubleForICollection();
                doubleForICollection.DoubleValue = flightReservation.ocenaKompanije;
                flightCompany.ocene.Add(doubleForICollection);
                _context.Entry(flightCompany).State = EntityState.Modified;
            }

            _context.Entry(flightReservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightReservationExists(_context, flightReservation.id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return flightReservation;
        }

        private bool FlightReservationExists(MAANPP20Context _context, int id) => _context.FlightReservations.Any(e => e.id == id);

        private async Task<bool> Check(MAANPP20Context _context, string invitationString)
        {
            FriendForFlight friendForFlight = await _context.FriendForFlights
                .FirstOrDefaultAsync(x => x.invitationString == invitationString);
            if (friendForFlight == null) return true;
            return false;
        }

        private string RandomString(MAANPP20Context _context)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string str = new string(Enumerable.Repeat(chars, 10)
              .Select(s => s[random.Next(s.Length)]).ToArray());
            if (!this.Check(_context, str).Result)
                RandomString(_context);
            return str;
        }

        private bool SendMail(List<FriendForFlight> friendForFlights)
        {
            foreach (var friendForFlight in friendForFlights)
            {
                string to = "andrej.km997@gmail.com";
                string from = "andrej.km997@gmail.com";
                string subject = "Poziv za let";
                string body = $"Postovani/a {friendForFlight.prezime} {friendForFlight.ime},\n" +
                    $"Pozvani ste na let, vase mesto je {friendForFlight.seatNumber}.\n" +
                    $"Aktivacioni/deactivacioni kod vase pozivnice je {friendForFlight.invitationString}\n" +
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

        public async Task<ActionResult<FlightReservation>> DeleteFlightReservation(MAANPP20Context _context, int id)
        {
            var flightReservation = await _context.FlightReservations
                .Where(x => x.deleted == false)
                .FirstOrDefaultAsync(i => i.id == id);
            if (flightReservation == null)
            {
                return null;
            }
            else if (flightReservation.deleted == true)
            {
                return null;
            }
            var flight = await _context.Flights
                .Where(x => x.deleted == false)
                .FirstOrDefaultAsync(x => x.id == flightReservation.flightId);
            if (flight == null) return null;
            else
            {
                if (CanDelete(flight.datumPolaska))
                {
                    AvioSediste avioSediste = await _context.AvioSedista
                    .Where(x => x.deleted == false)
                    .FirstOrDefaultAsync(id => id.id == flightReservation.seatId);
                    if (avioSediste == null) return null;
                    if (avioSediste.isFastReservation == true) return null;
                    if (avioSediste.deleted == true) return null;
                    if (avioSediste.reserved == false) return null;
                    avioSediste.reserved = false;
                    _context.Entry(avioSediste).State = EntityState.Modified;

                    flightReservation.deleted = true;

                    _context.Entry(flightReservation).State = EntityState.Modified;

                    await _context.SaveChangesAsync();

                    return flightReservation;
                }
                else return null;
            }
        }
        
        private bool CanDelete(DateTime flightDateTime)
        {
            var dateNow = DateTime.Now;

            if (dateNow.Year < flightDateTime.Year) return true;
            else if (dateNow.Year == flightDateTime.Year)
            {
                if (dateNow.Month < flightDateTime.Month) return true;
                else if (dateNow.Month == flightDateTime.Month)
                {
                    if (dateNow.Day < flightDateTime.Day) return true;
                    else if (dateNow.Day == flightDateTime.Day)
                    {
                        if (dateNow.Hour < flightDateTime.Hour - 3) return true;
                        else return false;
                    }
                    else return false;
                }
                else return false;
            }

            return false;
        }

        public async Task<FriendForFlight> AcceptFriendForFlight(MAANPP20Context _context, StringForICollection invitationString)
        {
            var friendForFlight = await _context.FriendForFlights
                .Where(x => x.deleted == false)
                .FirstOrDefaultAsync(x => x.invitationString == invitationString.PlainString);
            if (friendForFlight == null) return null;

            friendForFlight.acceptedCall = true;
            _context.Entry(friendForFlight).State = EntityState.Modified;

            _context.SaveChanges();

            return friendForFlight;
        }

        public async Task<FriendForFlight> DeclineFriendForFlight(MAANPP20Context _context, string invitationString)
        {
            var friendForFlight = await _context.FriendForFlights
                .Where(x => x.deleted == false)
                .FirstOrDefaultAsync(x => x.invitationString == invitationString);
            if (friendForFlight == null) return null;
            if (friendForFlight.deleted == true) return null;

            var seat = await _context.AvioSedista
                .Where(x => x.reserved == true)
                .FirstOrDefaultAsync(x => x.id == friendForFlight.seatId);
            if (seat == null) return null;
            seat.reserved = false;
            _context.Entry(seat).State = EntityState.Modified;

            friendForFlight.deleted = true;
            _context.Entry(friendForFlight).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw;
            }

            return friendForFlight;
        }

        public async Task<ActionResult<IEnumerable<FriendForFlight>>> GetCallsForFlight(MAANPP20Context _context, string email)
        {
            var user = await _context.Users.Where(x => x.deleted == false)
                .FirstOrDefaultAsync(i => i.Email == email);

            if (user == null) return null;

            var friendForFlight = await _context.FriendForFlights
                .Where(x => x.deleted == false && x.email == email && x.ime == user.firstName && x.prezime == user.lastName && x.acceptedCall == false)
                .ToListAsync();
            if (friendForFlight == null) return null;

            return friendForFlight;
        }

        public async Task<ActionResult<IEnumerable<FlightReservation>>> GetFlightReservationsStatistics(MAANPP20Context _context, int idFlight)
        {
            return await _context.FlightReservations
                .Where(x => x.deleted == false)
                .Where(id => id.flightId == idFlight)
                .ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<FriendForFlight>>> CheckAllReservations(MAANPP20Context _context)
        {
            var friendForFlight = await _context.FriendForFlights
                .Where(x => x.deleted == false && x.acceptedCall == false).ToListAsync();

            foreach (var friend in friendForFlight)
            {
                if (friend == null) continue;
                if (CheckDateIf(friend.reservationDate))
                {
                    friend.deleted = true;
                    _context.Entry(friend).State = EntityState.Modified;

                    var avioSeat = await _context.AvioSedista
                        .Where(x => x.deleted == false)
                        .FirstOrDefaultAsync(x => x.id == friend.seatId);
                    if (avioSeat == null) continue;
                    avioSeat.reserved = false;
                    _context.Entry(avioSeat).State = EntityState.Modified;
                }
            }

            return null;
        }

        private bool CheckDateIf(DateTime dateTimeReservation)
        {
            var dateNow = DateTime.Now;

            if (dateTimeReservation.Year == dateNow.Year)
            {
                if (dateTimeReservation.Month == dateNow.Month)
                {
                    if (dateTimeReservation.Day >= dateNow.Day + 3)
                    {
                        return true;
                    }
                }
            }

            return false;
        }
    }
}
