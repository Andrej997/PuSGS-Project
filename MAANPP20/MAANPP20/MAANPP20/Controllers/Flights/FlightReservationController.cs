using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAANPP20.Data;
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
        private readonly MAANPP20Context _context;
        public FlightReservationController(MAANPP20Context context)
        {
            _context = context;
        }

        // GET: api/FlightReservation/546tr76f
        [HttpGet("{idUser}")]
        public async Task<ActionResult<IEnumerable<FlightReservation>>> GetFlightReservations(string idUser)
        {
            return await _context.FlightReservations
                .Where(x => x.deleted == false)
                .Where(usersId => usersId.UserIdForPOST == idUser)
                .ToListAsync();
        }

        [HttpPost]
        [Route("Reserve")]
        public async Task<ActionResult<FlightReservation>> AddFlightReservation(FlightReservation flightReservation)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (ValidateModel(flightReservation, true))
            {
                User user = await _context.Users.Where(x => x.deleted == false)
                    .Include(flightReservations => flightReservations.flightReservations)
                    .FirstOrDefaultAsync(id => id.Id == flightReservation.UserIdForPOST);

                if (user == null) return BadRequest();

                AvioSediste avioSediste = await _context.AvioSedista
                    .Where(x => x.deleted == false)
                    .FirstOrDefaultAsync(id => id.id == flightReservation.seatId);
                if (avioSediste == null) return BadRequest();
                if (avioSediste.isFastReservation == true) return BadRequest();
                if (avioSediste.deleted == true) return BadRequest();
                if (avioSediste.reserved == true) return BadRequest();
                avioSediste.reserved = true;
                _context.Entry(avioSediste).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {

                    throw;
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
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {

                    throw;
                }
                //await _context.SaveChangesAsync();

                return Ok();
            }
            else return BadRequest();
        }

        // PUT: api/FlightReservation
        [HttpPut]
        public async Task<IActionResult> UpdateFlightReservation(FlightReservation flightReservation)
        {
            Flight flight = await _context.Flights.Where(x => x.deleted == false)
                    .Include(ocene => ocene.ocene)
                    .FirstOrDefaultAsync(id => id.id == flightReservation.flightId);
            if (flight == null) return BadRequest();
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
                if (flightCompany == null) return BadRequest();
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
                if (!FlightReservationExists(flightReservation.id))
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

        // DELETE: api/FlightReservation/DeleteFR/1
        [HttpDelete]
        [Route("DeleteFR/{id}")]
        public async Task<ActionResult<FlightReservation>> DeleteFlightReservation(int id)
        {
            var flightReservation = await _context.FlightReservations
                .Where(x => x.deleted == false)
                .FirstOrDefaultAsync(i => i.id == id);
            if (flightReservation == null)
            {
                return NotFound();
            }
            else if (flightReservation.deleted == true)
            {
                return NotFound();
            }

            AvioSediste avioSediste = await _context.AvioSedista
                    .Where(x => x.deleted == false)
                    .FirstOrDefaultAsync(id => id.id == flightReservation.seatId);
            if (avioSediste == null) return BadRequest();
            if (avioSediste.isFastReservation == true) return BadRequest();
            if (avioSediste.deleted == true) return BadRequest();
            if (avioSediste.reserved == false) return BadRequest();
            avioSediste.reserved = false;
            _context.Entry(avioSediste).State = EntityState.Modified;

            flightReservation.deleted = true;

            _context.Entry(flightReservation).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok();
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
    }
}