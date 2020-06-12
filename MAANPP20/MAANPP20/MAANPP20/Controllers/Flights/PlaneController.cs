using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAANPP20.Data;
using MAANPP20.FlightRepositories;
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
        private PlaneRepo planeRepo = new PlaneRepo();
        private readonly MAANPP20Context _context;
        public PlaneController(MAANPP20Context context)
        {
            _context = context;
        }

        // GET: api/Plane
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aeroplane>>> GetAeroplanes()
        {
            return await planeRepo.GetAeroplanes(_context);
            //return await _context.Aeroplanes
            //    .Where(x => x.deleted == false)
            //    .ToListAsync();
        }

        // GET: api/Plane/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Aeroplane>> GetAeroplane(int id)
        {
            var aeroplane = await planeRepo.GetAeroplane(_context, id);
            if (aeroplane == null) return NotFound();
            return aeroplane;
            //var aeroplane = await _context.Aeroplanes
            //    .Where(x => x.deleted == false)
            //    .FirstOrDefaultAsync(i => i.id == id);

            //if (aeroplane == null)
            //{
            //    return NotFound();
            //}
            //return aeroplane;
        }

        [HttpPost]
        [Route("AddPlane")]
        public async Task<ActionResult<Aeroplane>> AddPlane(Aeroplane aeroplane)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (ValidateModel(aeroplane, true))
            {
                var plane = await planeRepo.AddPlane(_context, aeroplane);
                if (plane == null) return BadRequest();
                return CreatedAtAction("GetAeroplane", new { id = aeroplane.id }, aeroplane);

                //_context.Aeroplanes.Add(aeroplane);

                //await _context.SaveChangesAsync();

                //return CreatedAtAction("GetAeroplane", new { id = aeroplane.id }, aeroplane);
            }
            else return BadRequest();
        }

        // PUT: api/Plane
        [HttpPut]
        public async Task<IActionResult> UpdatePlane(Aeroplane aeroplane)
        {
            var retAeroplane = await planeRepo.UpdatePlane(_context, aeroplane);
            if (retAeroplane == null) return NotFound();
            //_context.Entry(aeroplane).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!PlaneExists(aeroplane.id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return Ok();
        }


        // DELETE: api/Plane/DeletePlane/1
        [HttpDelete]
        [Route("DeletePlane/{id}")]
        public async Task<ActionResult<Aeroplane>> DeletePlane(int id)
        {
            var plane = await planeRepo.DeletePlane(_context, id);
            if (plane == null) return NotFound();
            //var plane = await _context.Aeroplanes
            //    .Where(x => x.deleted == false)
            //    .FirstOrDefaultAsync(i => i.id == id);

            //if (plane == null)
            //{
            //    return NotFound();
            //}
            //else if (plane.deleted == true)
            //{
            //    return NotFound();
            //}

            //plane.deleted = true;

            //_context.Entry(plane).State = EntityState.Modified;

            ////_context.Aeroplanes.Remove(plane);
            //await _context.SaveChangesAsync();

            return Ok();
        }

        private bool PlaneExists(int id) => _context.Aeroplanes.Any(e => e.id == id);

        private bool ValidateModel(Aeroplane aeroplane, bool isPost)
        {
            if (aeroplane.numSeats < 1) return false;

            // na googlu pise da najveci putnicki avio prima max 525 putnika (Airbus A380-800)
            if (aeroplane.numSeats > 525) return false;

            // TO DO:
            // Proveri da li vec postoji naziv aviona u bazi,
            // ako npr. postoji Boing 747, baci false!

            // prilikom POST i PUT ne moze se logicki obrisati jer to je namenjeno za DELETE!
            if (aeroplane.deleted == true) return false;

            return true;
        }
    }
}