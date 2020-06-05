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
                .Include(flight => flight.flight)
                    .ThenInclude(from => from.from)
                .Include(flight => flight.flight)
                    .ThenInclude(to => to.to)
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

                foreach (var item in fastFlightReservation.flight.allSeatsForThisFlight)
                {
                    _context.Entry(item).State = EntityState.Detached;
                }

                user.fastFlightReservations.Add(fastFlightReservation);

                try
                {
                    _context.Entry(user).State = EntityState.Modified;
                }
                catch (Exception e)
                {

                    throw;
                }
               

                _context.Entry(fastFlightReservation.flight).State = EntityState.Unchanged;

                _context.Entry(fastFlightReservation.flight).State = EntityState.Unchanged;

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

            fastFlightReservation.deleted = true;

            _context.Entry(fastFlightReservation).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ValidateModel(FastFlightReservation fastFlightReservation, bool isPost)
        {
            if (fastFlightReservation.flight == null) return false;
            if (fastFlightReservation.UserIdForPOST == null || fastFlightReservation.UserIdForPOST == "") return false;
            if (fastFlightReservation.price <= 0) return false;
            if (fastFlightReservation.seatNumeration <= 0) return false;

            return true;
        }
    }
}