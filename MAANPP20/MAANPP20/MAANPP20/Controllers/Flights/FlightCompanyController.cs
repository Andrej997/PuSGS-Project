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
            return await _context.FlightCompanies.ToListAsync();
        }

        // GET: api/FlightCompany/1
        [HttpGet("{id}")]
        public async Task<ActionResult<FlightCompany>> GetFlightCompany(int id)
        {
            var flightCompany = await _context.FlightCompanies.FindAsync(id);
            if (flightCompany == null)
            {
                return NotFound();
            }
            return flightCompany;
        }

        [HttpPost]
        [Route("AddFlightCompany")]
        public async Task<ActionResult<FlightCompany>> AddFlightCompany(FlightCompany flightCompany)
        {
            // dodavanje adrese
            _context.Addresses.Add(flightCompany.address);
            int addressCount = _context.Addresses.Count();
            flightCompany.addressId = addressCount + 1;

            _context.FlightCompanies.Add(flightCompany);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlightCompany", new { id = flightCompany.id }, flightCompany);
        }

        // PUT: api/FlightCompany/1
        [HttpPut]
        [Route("UpdateBook")]
        public async Task<IActionResult> UpdateFlightCompany(FlightCompany flightCompany)
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

            return NoContent();
        }

        // DELETE: api/FlightCompany/1
        [HttpDelete]
        [Route("DeleteFlightCompany/{id}")]
        public async Task<ActionResult<FlightCompany>> DeleteFlightCompany(int id)
        {
            var flightCompany = await _context.FlightCompanies.FindAsync(id);
            if (flightCompany == null)
            {
                return NotFound();
            }

            _context.FlightCompanies.Remove(flightCompany);
            await _context.SaveChangesAsync();

            return flightCompany;
        }

        private bool FlightCompanyExists(int id) => _context.FlightCompanies.Any(e => e.id == id);
    }
}