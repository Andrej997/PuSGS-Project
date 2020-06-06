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
    public class FastFlightReservationController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        public FastFlightReservationController(MAANPP20Context context)
        {
            _context = context;
        }

        // GET: api/FastFlightReservation/546tr76f
        [HttpGet("{idUser}")]
        public async Task<ActionResult<IEnumerable<FastFlightReservation>>> GetFastFlightReservations(string idUser)
        {
            return await _context.FastFlightReservations
                .Where(x => x.deleted == false)
                .Where(usersId => usersId.UserIdForPOST == idUser)
                .ToListAsync();
        }

        [HttpPost]
        [Route("Reserve")]
        public async Task<ActionResult<FastFlightReservation>> AddPlane(FastFlightReservation fastFlightReservation)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (ValidateModel(fastFlightReservation, true))
            {
                User user = await _context.Users.Where(x => x.deleted == false)
                    .Include(fastFlightReservations => fastFlightReservations.fastFlightReservations)
                    .FirstOrDefaultAsync(id => id.Id == fastFlightReservation.UserIdForPOST);

                if (user == null) return BadRequest();

                AvioSediste avioSediste = await _context.AvioSedista
                    .Where(x => x.deleted == false)
                    .FirstOrDefaultAsync(id => id.id == fastFlightReservation.seatId);
                if (avioSediste == null) return BadRequest();
                if (avioSediste.isFastReservation == false) return BadRequest(); 
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

                return Ok();//CreatedAtAction("GetFastFlightReservation", new { id = fastFlightReservation.id }, fastFlightReservation);
            }
            else return BadRequest();
        }

        // PUT: api/FastFlightReservation
        [HttpPut]
        public async Task<IActionResult> UpdateFastFlightReservation(FastFlightReservation fastFlightReservation)
        {
            Flight flight = await _context.Flights.Where(x => x.deleted == false)
                    .Include(ocene => ocene.ocene)
                    .FirstOrDefaultAsync(id => id.id == fastFlightReservation.flightId);
            if (flight == null) return BadRequest();
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
                if (flightCompany == null) return BadRequest();
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
                if (!FastFlightReservationExists(fastFlightReservation.id))
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

        // DELETE: api/FastFlightReservation/DeleteFFR/1
        [HttpDelete]
        [Route("DeleteFFR/{id}")]
        public async Task<ActionResult<FastFlightReservation>> DeleteFastFlightReservation(int id)
        {
            var fastFlightReservation = await _context.FastFlightReservations
                .Where(x => x.deleted == false)
                .FirstOrDefaultAsync(i => i.id == id);
            if (fastFlightReservation == null)
            {
                return NotFound();
            }
            else if (fastFlightReservation.deleted == true)
            {
                return NotFound();
            }

            AvioSediste avioSediste = await _context.AvioSedista
                    .Where(x => x.deleted == false)
                    .FirstOrDefaultAsync(id => id.id == fastFlightReservation.seatId);
            if (avioSediste == null) return BadRequest();
            if (avioSediste.isFastReservation == false) return BadRequest();
            if (avioSediste.deleted == true) return BadRequest();
            if (avioSediste.reserved == false) return BadRequest();
            avioSediste.reserved = false;
            _context.Entry(avioSediste).State = EntityState.Modified;

            fastFlightReservation.deleted = true;

            _context.Entry(fastFlightReservation).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool FastFlightReservationExists(int id) => _context.FastFlightReservations.Any(e => e.id == id);

        private bool ValidateModel(FastFlightReservation fastFlightReservation, bool isPost)
        {
            if (fastFlightReservation.ocenaLeta < 0 && isPost == true) return false; 
            if (fastFlightReservation.ocenaKompanije < 0 && isPost == true) return false; 
            if (fastFlightReservation.flightId < 1) return false;
            if (fastFlightReservation.UserIdForPOST == null || fastFlightReservation.UserIdForPOST == "") return false;
            if (fastFlightReservation.price <= 0) return false;
            if (fastFlightReservation.seatNumeration <= 0) return false;

            return true;
        }
    }
}