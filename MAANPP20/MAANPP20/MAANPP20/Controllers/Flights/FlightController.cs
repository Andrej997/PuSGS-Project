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
    public class FlightController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        public FlightController(MAANPP20Context context)
        {
            _context = context;
        }

        // GET: api/Flight
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
            var flights = await _context.Flights.Where(x => x.deleted == false)
                .Include(from => from.from)
                .Include(to => to.to)
                .Include(presedanje => presedanje.presedanje)
                .ThenInclude(gradoviPresedanja => gradoviPresedanja.gradoviPresedanja)
                .Include(aeroplane => aeroplane.aeroplane)
                .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                .Include(luggage => luggage.luggage)
                .Include(ocene => ocene.ocene)
                .ToListAsync();

            var retFlights = new List<Flight>();
            foreach (var flight in flights)
                if (flight.deleted == false)
                    retFlights.Add(flight);

            return retFlights;
        }   

        // GET: api/Flight/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Flight>> GetFlight(int id)
        {
            Flight flight = null;
            try
            {
                flight = await _context.Flights.Where(x => x.deleted == false)
                .Include(from => from.from)
                .Include(to => to.to)
                .Include(presedanje => presedanje.presedanje)
                .ThenInclude(gradoviPresedanja => gradoviPresedanja.gradoviPresedanja)
                .Include(aeroplane => aeroplane.aeroplane)
                .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                .Include(luggage => luggage.luggage)
                .Include(ocene => ocene.ocene)
                .FirstOrDefaultAsync(i => i.id == id);

                if (flight == null)
                {
                    return NotFound();
                }
                if (flight.deleted == true)
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {

                throw;
            }
            
            return flight;
        }

        // GET: api/Flight/Seats/1
        [HttpGet("Seats/{id}")]
        public async Task<ActionResult<Flight>> GetFlightSeats(int id)
        {
            Flight flight = null;
            try
            {
                flight = await _context.Flights
                .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                .FirstOrDefaultAsync(i => i.id == id);

                if (flight == null)
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {

                throw;
            }

            return flight;
        }

        // POST: api/Flight/AddF
        [HttpPost]
        [Route("AddF")]
        public async Task<ActionResult<Flight>> AddFlight(Flight flight)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (ValidateModel(flight))
            {
                // daj mi komapniju
                var flightCompany = await _context.FlightCompanies
                .Include(address => address.address)
                .Include(destinations => destinations.destinations)
                .Include(flights => flights.flights)
                .Include(ocene => ocene.ocene)
                .FirstOrDefaultAsync(i => i.id == flight.idCompany);

                if (flightCompany == null)
                {
                    return BadRequest();
                }

                // posto vec postoje sa primarnim kljucevima
                flight.addressFromId = flight.from.id;
                flight.addressToId = flight.to.id;
                flight.aeroplaneId = flight.aeroplane.id;

                //dodaj mu destinaciju i sacuvaj izmene u kompaniji
                flightCompany.flights.Add(flight);

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {

                    throw;
                }

                return CreatedAtAction("GetFlight", new { id = flight.id }, flight);
            }
            else return BadRequest();
        }

        // PUT: api/Flight
        [HttpPut]
        public async Task<IActionResult> UpdateFlight(Flight flight)
        {
            //if (ValidateModel(flightCompany, false))
            //{
                _context.Entry(flight).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FlightExists(flight.id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return Ok();
            //}
            //else return BadRequest();
        }


        // DELETE: api/Flight/DeleteFlight/1
        [HttpDelete]
        [Route("DeleteFlight/{id}")]
        public async Task<ActionResult<Flight>> DeleteFlight(int id)
        {
            var flight = await _context.Flights
                .Include(presedanje => presedanje.presedanje)
                .Include(luggage => luggage.luggage)
                .Include(ocene => ocene.ocene)
                .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                .FirstOrDefaultAsync(i => i.id == id);

            if (flight == null)
            {
                return NotFound();
            }
            else if (flight.deleted == true)
            {
                return NotFound();
            }

            flight.deleted = true;
            foreach (var seat in flight.allSeatsForThisFlight)
            {
                seat.deleted = true;
            }

            flight.presedanje.deleted = true;
            foreach (var gradPresedanja in flight.presedanje.gradoviPresedanja)
                gradPresedanja.deleted = true;

            flight.luggage.deleted = true;

            // TO DO: brisanje ocena

            _context.Entry(flight).State = EntityState.Modified;
            //_context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ValidateModel(Flight flight)
        {

            return true;
        }

        private bool FlightExists(int id) => _context.Flights.Any(e => e.id == id);
    }
}