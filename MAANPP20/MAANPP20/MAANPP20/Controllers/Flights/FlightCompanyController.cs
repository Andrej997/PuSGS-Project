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
    public class FlightCompanyController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        public FlightCompanyController(MAANPP20Context context)
        {
            _context = context;
        }

        // GET: api/FlightCompany
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlightCompany>>> GetFlightCompany()
        {
            return await _context.FlightCompanies
                .Include(address => address.address)
                //.Include(destinations => destinations.destinations)
                //    .ThenInclude(startAddress => startAddress.startAddress)
                //.Include(destinations => destinations.destinations)
                //    .ThenInclude(endAddress => endAddress.endAddress)
                //.Include(flights => flights.flights)
                //.Include(ocene => ocene.ocene)
                /* izbacio sam sve ove parametre,
                    jer nisu potrebni u prozoru koji
                    poziva ovu metodu!*/
                .ToListAsync();
        }

        // GET: api/FlightCompany/1
        [HttpGet("{id}")]
        public async Task<ActionResult<FlightCompany>> GetFlightCompany(int id)
        {
            var flightCompany = await _context.FlightCompanies
                .Include(address => address.address)
                .Include(destinations => destinations.destinations)
                    .ThenInclude(startAddr => startAddr.startAddress)
                .Include(destinations => destinations.destinations)
                    .ThenInclude(endAddr => endAddr.endAddress)
                .Include(flights => flights.flights)
                    //.ThenInclude(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                .Include(ocene => ocene.ocene)
                .FirstOrDefaultAsync(i => i.id == id);

            if (flightCompany == null)
            {
                return NotFound();
            }
            return flightCompany;
        }

        [HttpPost]
        [Route("AddFC")]
        public async Task<ActionResult<FlightCompany>> AddFlightCompany(FlightCompany flightCompany)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (ValidateModel(flightCompany, true))
            {
                _context.FlightCompanies.Add(flightCompany);

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFlightCompany", new { id = flightCompany.id }, flightCompany);
            }
            else return BadRequest();
        }

        // PUT: api/FlightCompany
        [HttpPut]
        public async Task<IActionResult> UpdateFlightCompany(FlightCompany flightCompany)
        {
            if (ValidateModel(flightCompany, false))
            {
                _context.Entry(flightCompany).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FlightCompanyExists(flightCompany.id))
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

        // DELETE: api/FlightCompany/DeleteFlightCompany/1
        [HttpDelete]
        [Route("DeleteFlightCompany/{id}")]
        public async Task<ActionResult<FlightCompany>> DeleteFlightCompany(int id)
        {
            var flightCompany = await _context.FlightCompanies
                .Include(address => address.address)
                .Include(destinations => destinations.destinations)
                .Include(flights => flights.flights)
                .Include(ocene => ocene.ocene)
                .FirstOrDefaultAsync(i => i.id == id);

            if (flightCompany == null)
            {
                return NotFound();
            }

            _context.FlightCompanies.Remove(flightCompany);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool FlightCompanyExists(int id) => _context.FlightCompanies.Any(e => e.id == id);

        private bool ValidateModel(FlightCompany flightCompany, bool isPost)
        {
            // ako je prilikom kreiranja komapnije dodato nesto u neku od listi, posto to iz osnovne forme ne moze!
            if ((flightCompany.destinations.Count != 0 || flightCompany.flights.Count != 0 || flightCompany.ocene.Count != 0) && isPost) return false;

            // provera da li su sva slova ili razmak
            foreach (var character in flightCompany.name)
                if (!Char.IsLetter(character)) 
                    if (!Char.IsWhiteSpace(character))
                        return false;

            return true;
        }
    }
}