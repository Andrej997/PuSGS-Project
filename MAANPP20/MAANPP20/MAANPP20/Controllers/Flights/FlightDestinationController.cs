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
    public class FlightDestinationController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        public FlightDestinationController(MAANPP20Context context)
        {
            _context = context;
        }

        /// <summary>
        /// Samo jedan koji sluzi prilikom izmene
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET: api/FlightDestination/1
        [HttpGet("{id}")]
        public async Task<ActionResult<FlightDestination>> GetFlightDestination(int id)
        {
            var flightDestinaion = await _context.FlightDestinations
                .Include(address1 => address1.startAddress)
                .Include(address2 => address2.endAddress)
                .FirstOrDefaultAsync(i => i.id== id);

            if (flightDestinaion == null)
            {
                return NotFound();
            }
            else if (flightDestinaion.deleted == true)
            {
                return NotFound();
            }
            return flightDestinaion;
        }

        // POST: api/FlightDestination/AddFD
        [HttpPost]
        [Route("AddFD")]
        public async Task<ActionResult<FlightDestination>> AddFlightCompany(FlightDestination flightDestination)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (ValidateModel(flightDestination))
            {
               // daj mi komapniju
               var flightCompany = await _context.FlightCompanies
               .Include(address => address.address)
               .Include(destinations => destinations.destinations)
               .Include(flights => flights.flights)
               .Include(ocene => ocene.ocene)
               .FirstOrDefaultAsync(i => i.id == flightDestination.CompanyID);

                if (flightCompany == null)
                {
                    return BadRequest();
                }

                //dodaj mu destinaciju i sacuvaj izmene u kompaniji
                flightCompany.destinations.Add(flightDestination);

                _context.FlightDestinations.Add(flightDestination);

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFlightDestination", new { id = flightDestination.id }, flightDestination);
            }
            else return BadRequest();
        }

        // PUT: api/FlightDestination
        [HttpPut]
        public async Task<IActionResult> UpdateFlightCompany(FlightDestination flightDestination)
        {
            if (ValidateModel(flightDestination))
            {
                _context.Entry(flightDestination).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FlightDestinationExists(flightDestination.id))
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
            else return BadRequest();
        }

        // DELETE: api/FlightDestination/DeleteFlightDestination/1
        [HttpDelete]
        [Route("DeleteFlightDestination/{id}")]
        public async Task<ActionResult<FlightDestination>> DeleteFlightDestination(int id)
        {
            var flightDestinaion = await _context.FlightDestinations
                .Include(address1 => address1.startAddress)
                .Include(address2 => address2.endAddress)
                .FirstOrDefaultAsync(i => i.id == id);

            if (flightDestinaion == null)
            {
                return NotFound();
            }

            flightDestinaion.deleted = true;
            flightDestinaion.startAddress.deleted = true;
            flightDestinaion.endAddress.deleted = true;

            _context.Entry(flightDestinaion).State = EntityState.Modified;

            //_context.FlightDestinations.Remove(flightDestinaion);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ValidateModel(FlightDestination flightDestination)
        {
            // u realnoj situaciji mozda bi moglo da se potrefi da postoje u istoj drzavi 2 grada pod istim imenom i na istoj adresi, 
            // ali u nasem sistemu to ne moze da se desi

            if (flightDestination.startAddress.streetAndNumber == null || flightDestination.endAddress.streetAndNumber == null)
                return false;

            if (flightDestination.startAddress.streetAndNumber == flightDestination.endAddress.streetAndNumber)
                return false;

            if (flightDestination.startAddress.city == null || flightDestination.endAddress.city == null)
                return false;

            if (flightDestination.startAddress.city == flightDestination.endAddress.city)
                return false;

            if (flightDestination.startAddress.country == null || flightDestination.endAddress.country == null)
                return false;

            // samo necemo proveravati istu drzavu jer moze da se leti iz New York-a za Los Angeles

            if ((flightDestination.startAddress.city == flightDestination.startAddress.streetAndNumber) ||
                (flightDestination.startAddress.country == flightDestination.startAddress.streetAndNumber)) return false;

            if ((flightDestination.endAddress.city == flightDestination.endAddress.streetAndNumber) ||
                (flightDestination.endAddress.country == flightDestination.endAddress.streetAndNumber)) return false;

            // prilikom POST i PUT ne moze se logicki obrisati jer to je namenjeno za DELETE!
            if (flightDestination.deleted == true) return false;

            return true;
        }

        private bool FlightDestinationExists(int id) => _context.FlightDestinations.Any(e => e.id == id);
    }
}