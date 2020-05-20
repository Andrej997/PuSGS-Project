using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAANPP20.Data;
using MAANPP20.Models.Flights;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MAANPP20.Controllers.Flights
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaneController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        public PlaneController(MAANPP20Context context)
        {
            _context = context;
        }

        // GET: api/Plane
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aeroplane>>> GetAeroplanes()
        {
            return await _context.Aeroplanes
                .Include(allSeats => allSeats.allSeats)
                .ToListAsync();
        }

        // GET: api/Plane/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Aeroplane>> GetAeroplane(int id)
        {
            var aeroplane = await _context.Aeroplanes
                .Include(allSeats => allSeats.allSeats)
                .FirstOrDefaultAsync(i => i.id == id);

            if (aeroplane == null)
            {
                return NotFound();
            }
            return aeroplane;
        }

        [HttpPost]
        [Route("AddPlane")]
        public async Task<ActionResult<Aeroplane>> AddPlane(Aeroplane aeroplane)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (ValidateModel(aeroplane, true))
            {
                _context.Aeroplanes.Add(aeroplane);

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetAeroplane", new { id = aeroplane.id }, aeroplane);
            }
            else return BadRequest();
        }

        // PUT: api/Plane
        [HttpPut]
        public async Task<IActionResult> UpdatePlane(Aeroplane aeroplane)
        {
            _context.Entry(aeroplane).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaneExists(aeroplane.id))
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


        // DELETE: api/Plane/DeletePlane/1
        [HttpDelete]
        [Route("DeletePlane/{id}")]
        public async Task<ActionResult<Aeroplane>> DeletePlane(int id)
        {
            var plane = await _context.Aeroplanes
                .Include(allSeats => allSeats.allSeats)
                .FirstOrDefaultAsync(i => i.id == id);

            if (plane == null)
            {
                return NotFound();
            }

            _context.Aeroplanes.Remove(plane);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool PlaneExists(int id) => _context.Aeroplanes.Any(e => e.id == id);

        private bool ValidateModel(Aeroplane aeroplane, bool isPost)
        {
            if (aeroplane.allSeats.Count < 1 || aeroplane.numSeats < 1) return false;

            // TO DO:
            // Proveri da li vec postoji naziv aviona u bazi,
            // ako npr. postoji Boing 747, baci false!

            return true;
        }
    }
}