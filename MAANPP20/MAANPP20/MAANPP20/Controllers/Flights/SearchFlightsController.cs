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
    public class SearchFlightsController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        public SearchFlightsController(MAANPP20Context context)
        {
            _context = context;
        }

        // POST: api/SearchFlights/SearchFlightCompany
        [HttpPost]
        [Route("SearchFlightCompany")]
        public async Task<ActionResult<IEnumerable<FlightCompany>>> GetFlightCompany(SearchFlight search)
        {
            List<FlightCompany> flightCompanies;
            if (search.selectType == 1)
            {
                return flightCompanies = await _context.FlightCompanies
                    .Where(x => x.deleted == false && x.name == search.inputSearch)
                    .Include(address => address.address)
                    .Include(destinations => destinations.destinations)
                        .ThenInclude(startAddress => startAddress.startAddress)
                    .Include(destinations => destinations.destinations)
                        .ThenInclude(endAddress => endAddress.endAddress)
                    .Include(admin => admin.admin)
                    //.Include(flights => flights.flights)
                    //.Include(ocene => ocene.ocene)
                    /* izbacio sam sve ove parametre,
                        jer nisu potrebni u prozoru koji
                        poziva ovu metodu!*/
                    .ToListAsync();
            }
            else if (search.selectType == 2)
            {
                return flightCompanies = await _context.FlightCompanies
                    .Where(x => x.deleted == false && x.address.city == search.inputSearch)
                    .Include(address => address.address)
                    .Include(destinations => destinations.destinations)
                        .ThenInclude(startAddress => startAddress.startAddress)
                    .Include(destinations => destinations.destinations)
                        .ThenInclude(endAddress => endAddress.endAddress)
                    .Include(admin => admin.admin)
                    .ToListAsync();
            }
            else if (search.selectType == 3)
            {
               return flightCompanies = await _context.FlightCompanies
                    .Where(x => x.deleted == false && x.address.country == search.inputSearch)
                    .Include(address => address.address)
                    .Include(destinations => destinations.destinations)
                        .ThenInclude(startAddress => startAddress.startAddress)
                    .Include(destinations => destinations.destinations)
                        .ThenInclude(endAddress => endAddress.endAddress)
                    .Include(admin => admin.admin)
                    .ToListAsync();
            }
            

            return BadRequest();
        }
    }
}