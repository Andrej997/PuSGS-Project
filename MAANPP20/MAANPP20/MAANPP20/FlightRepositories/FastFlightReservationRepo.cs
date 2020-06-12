using MAANPP20.Data;
using MAANPP20.FlightInterfaces;
using MAANPP20.Models.Common;
using MAANPP20.Models.Flights;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightRepositories
{
    public class FastFlightReservationRepo : IFastFlightReservation
    {
        public async Task<ActionResult<FastFlightReservation>> AddFastFlightReservations(MAANPP20Context _context, FastFlightReservation fastFlightReservation)
        {
            User user = await _context.Users.Where(x => x.deleted == false)
                    .Include(fastFlightReservations => fastFlightReservations.fastFlightReservations)
                    .FirstOrDefaultAsync(id => id.Id == fastFlightReservation.UserIdForPOST);

            if (user == null) return null;
            AvioSediste avioSediste = await _context.AvioSedista
                .Where(x => x.deleted == false)
                .FirstOrDefaultAsync(id => id.id == fastFlightReservation.seatId);
            if (avioSediste == null) return null;
            if (avioSediste.isFastReservation == false) return null;
            if (avioSediste.deleted == true) return null;
            if (avioSediste.reserved == true) return null;
            avioSediste.reserved = true;
            //_context.Entry(avioSediste).State = EntityState.Modified;

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


            user.fastFlightReservations.Add(fastFlightReservation);
            // ako je user iskoristion svoj bonus
            if (fastFlightReservation.userBonus == true)
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

            _context.FastFlightReservations.Add(fastFlightReservation);



            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw;
            }
            //await _context.SaveChangesAsync();

            return fastFlightReservation;
        }

        public async Task<ActionResult<FastFlightReservation>> DeleteFastFlightReservation(MAANPP20Context _context, int id)
        {
            var fastFlightReservation = await _context.FastFlightReservations
                .Where(x => x.deleted == false)
                .FirstOrDefaultAsync(i => i.id == id);
            if (fastFlightReservation == null)
            {
                return null;
            }
            else if (fastFlightReservation.deleted == true)
            {
                return null;
            }

            var flight = await _context.Flights
                .Where(x => x.deleted == false)
                .FirstOrDefaultAsync(x => x.id == fastFlightReservation.flightId);
            if (flight == null) return null;
            else
            {
                if (CanDelete(flight.datumPolaska))
                {
                    AvioSediste avioSediste = await _context.AvioSedista
                            .Where(x => x.deleted == false)
                            .FirstOrDefaultAsync(id => id.id == fastFlightReservation.seatId);
                    if (avioSediste == null) return null;
                    if (avioSediste.isFastReservation == false) return null;
                    if (avioSediste.deleted == true) return null;
                    if (avioSediste.reserved == false) return null;
                    avioSediste.reserved = false;
                    _context.Entry(avioSediste).State = EntityState.Modified;

                    fastFlightReservation.deleted = true;

                    _context.Entry(fastFlightReservation).State = EntityState.Modified;

                    await _context.SaveChangesAsync();

                    return fastFlightReservation;
                }
                else return null;
            }
        }

        public async Task<ActionResult<IEnumerable<FastFlightReservation>>> GetFastFlightReservations(MAANPP20Context _context, string idUser)
        {
            return await _context.FastFlightReservations
                .Where(x => x.deleted == false)
                .Where(usersId => usersId.UserIdForPOST == idUser)
                .ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<FastFlightReservation>>> GetFastFlightReservationsStatistics(MAANPP20Context _context, int idFlight)
        {
            return await _context.FastFlightReservations
                .Where(x => x.deleted == false)
                .Where(id => id.flightId == idFlight)
                .ToListAsync();
        }

        public async Task<FastFlightReservation> UpdateFastFlightReservation(MAANPP20Context _context, FastFlightReservation fastFlightReservation)
        {
            Flight flight = await _context.Flights.Where(x => x.deleted == false)
                    .Include(ocene => ocene.ocene)
                    .FirstOrDefaultAsync(id => id.id == fastFlightReservation.flightId);
            if (flight == null) return null;
            if (fastFlightReservation.ocenaLeta > 0)
            {
                DoubleForICollection doubleForICollection = new DoubleForICollection();
                doubleForICollection.DoubleValue = fastFlightReservation.ocenaLeta;
                flight.ocene.Add(doubleForICollection);
                _context.Entry(flight).State = EntityState.Modified;
            }

            if (fastFlightReservation.ocenaKompanije > 0)
            {
                FlightCompany flightCompany = await _context.FlightCompanies.Where(x => x.deleted == false)
                    .Include(ocene => ocene.ocene)
                    .FirstOrDefaultAsync(id => id.id == flight.idCompany);
                if (flightCompany == null) return null;
                DoubleForICollection doubleForICollection = new DoubleForICollection();
                doubleForICollection.DoubleValue = fastFlightReservation.ocenaKompanije;
                flightCompany.ocene.Add(doubleForICollection);
                _context.Entry(flightCompany).State = EntityState.Modified;
            }

            _context.Entry(fastFlightReservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FastFlightReservationExists(_context, fastFlightReservation.id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return fastFlightReservation;
        }

        private bool FastFlightReservationExists(MAANPP20Context _context, int id) => _context.FastFlightReservations.Any(e => e.id == id);
    
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
    }
}
