using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAANPP20.Data;
using MAANPP20.Models.Flights;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MAANPP20.Controllers.Flights
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightCompanyController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        //private UserManager<User> UserManager;
        public FlightCompanyController(MAANPP20Context context)
        {
            _context = context;
        }

        // GET: api/FlightCompany
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlightCompany>>> GetFlightCompany()
        {
            var flightCompanies = await _context.FlightCompanies.Where(x => x.deleted == false)
                .Include(address => address.address)
                .Include(destinations => destinations.destinations)
                    .ThenInclude(startAddress => startAddress.startAddress)
                .Include(destinations => destinations.destinations)
                    .ThenInclude(endAddress => endAddress.endAddress)
                //.Include(flights => flights.flights)
                //.Include(ocene => ocene.ocene)
                /* izbacio sam sve ove parametre,
                    jer nisu potrebni u prozoru koji
                    poziva ovu metodu!*/
                .ToListAsync();

            var retFlightCompanies = new List<FlightCompany>();
            foreach (var flightCompany in flightCompanies)
                if (flightCompany.deleted == false)
                {
                    var retFlightDestinations = new List<FlightDestination>();
                    foreach (var flightDestination in flightCompany.destinations)
                    {
                        if (flightDestination.deleted == false)
                            retFlightDestinations.Add(flightDestination);
                    }
                    flightCompany.destinations = retFlightDestinations;
                    retFlightCompanies.Add(flightCompany);
                }



            return retFlightCompanies;
        }

        // GET: api/FlightCompany/1
        [HttpGet("{id}")]
        public async Task<ActionResult<FlightCompany>> GetFlightCompany(int id)
        {
            var flightCompany = await _context.FlightCompanies.Where(x => x.deleted == false)
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
            else if (flightCompany.deleted == true)
            {
                return NotFound();
            }

            var flightDestinations = new List<FlightDestination>();
            foreach (var flightDestination in flightCompany.destinations)
                if (flightDestination.deleted == false)
                    flightDestinations.Add(flightDestination);
            flightCompany.destinations = flightDestinations;

            var flights = new List<Flight>();
            foreach (var flight in flightCompany.flights)
                if (flight.deleted == false)
                    flights.Add(flight);
            flightCompany.flights = flights;

            // TO DO : isto i za ocene

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
                    .ThenInclude(startAddr => startAddr.startAddress)
                .Include(destinations => destinations.destinations)
                    .ThenInclude(endAddr => endAddr.endAddress)
                .Include(flights => flights.flights)
                    .ThenInclude(allSeats => allSeats.allSeatsForThisFlight)
                .Include(ocene => ocene.ocene)
                .FirstOrDefaultAsync(i => i.id == id);

            if (flightCompany == null)
            {
                return NotFound();
            }
            else if (flightCompany.deleted == true)
            {
                //flightCompany.deleted = false;
                return NotFound();
            }

            flightCompany.deleted = true;
            flightCompany.address.deleted = true;
            foreach (var destination in flightCompany.destinations)
            {
                destination.deleted = true;
                destination.startAddress.deleted = true;
                destination.endAddress.deleted = true;
            }
            foreach (var flight in flightCompany.flights)
            {
                flight.deleted = true;
                foreach (var seat in flight.allSeatsForThisFlight)
                {
                    seat.deleted = true;
                }
            }
            _context.Entry(flightCompany).State = EntityState.Modified;

            //_context.FlightCompanies.Remove(flightCompany);
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