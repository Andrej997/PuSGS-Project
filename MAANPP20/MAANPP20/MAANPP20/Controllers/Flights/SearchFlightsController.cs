using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoogleMaps.LocationServices;
using MAANPP20.Data;
using MAANPP20.FlightRepositories;
using MAANPP20.Models.Common;
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
        private SearchFlightsRepo searchFlightsRepo = new SearchFlightsRepo();
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
            var flightCompanies = await searchFlightsRepo.GetFlightCompany(_context, search);
            if (flightCompanies == null) return NotFound();
            return flightCompanies;
            //List<FlightCompany> flightCompanies;
            //if (search.selectType == 1)
            //{
            //    return flightCompanies = await _context.FlightCompanies
            //        .Where(x => x.deleted == false && x.name == search.inputSearch)
            //        .Include(address => address.address)
            //        .Include(destinations => destinations.destinations)
            //            .ThenInclude(startAddress => startAddress.startAddress)
            //        .Include(destinations => destinations.destinations)
            //            .ThenInclude(endAddress => endAddress.endAddress)
            //        .Include(admin => admin.admin)
            //        //.Include(flights => flights.flights)
            //        //.Include(ocene => ocene.ocene)
            //        /* izbacio sam sve ove parametre,
            //            jer nisu potrebni u prozoru koji
            //            poziva ovu metodu!*/
            //        .ToListAsync();
            //}
            //else if (search.selectType == 2)
            //{
            //    return flightCompanies = await _context.FlightCompanies
            //        .Where(x => x.deleted == false && x.address.city == search.inputSearch)
            //        .Include(address => address.address)
            //        .Include(destinations => destinations.destinations)
            //            .ThenInclude(startAddress => startAddress.startAddress)
            //        .Include(destinations => destinations.destinations)
            //            .ThenInclude(endAddress => endAddress.endAddress)
            //        .Include(admin => admin.admin)
            //        .ToListAsync();
            //}
            //else if (search.selectType == 3)
            //{
            //   return flightCompanies = await _context.FlightCompanies
            //        .Where(x => x.deleted == false && x.address.country == search.inputSearch)
            //        .Include(address => address.address)
            //        .Include(destinations => destinations.destinations)
            //            .ThenInclude(startAddress => startAddress.startAddress)
            //        .Include(destinations => destinations.destinations)
            //            .ThenInclude(endAddress => endAddress.endAddress)
            //        .Include(admin => admin.admin)
            //        .ToListAsync();
            //}


            //return BadRequest();
        }

        // POST: api/SearchFlights/SearchFlights
        [HttpPost]
        [Route("SearchFlights")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights(SearchFlight search)
        {
            var flights = await searchFlightsRepo.GetFlights(_context, search);
            if (flights == null) return NotFound();
            return flights;
            //List<Flight> flights;
            //if (search.selectType == 1)
            //{
            //    return flights = await _context.Flights
            //        .Where(x => x.deleted == false && x.company == search.inputSearch)
            //        .Include(from => from.from)
            //        .Include(to => to.to)
            //        .Include(presedanje => presedanje.presedanje)
            //            .ThenInclude(gradoviPresedanja => gradoviPresedanja.gradoviPresedanja)
            //        .Include(aeroplane => aeroplane.aeroplane)
            //        .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
            //        .Include(luggage => luggage.luggage)
            //        .Include(ocene => ocene.ocene)
            //        .ToListAsync();
            //}
            //else if (search.selectType == 2)
            //{
            //    return flights = await _context.Flights
            //        .Where(x => x.deleted == false && x.from.city == search.inputSearch)
            //        .Include(from => from.from)
            //        .Include(to => to.to)
            //        .Include(presedanje => presedanje.presedanje)
            //            .ThenInclude(gradoviPresedanja => gradoviPresedanja.gradoviPresedanja)
            //        .Include(aeroplane => aeroplane.aeroplane)
            //        .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
            //        .Include(luggage => luggage.luggage)
            //        .Include(ocene => ocene.ocene)
            //        .ToListAsync();
            //}
            //else if (search.selectType == 3)
            //{
            //    return flights = await _context.Flights
            //        .Where(x => x.deleted == false && x.to.city == search.inputSearch)
            //        .Include(from => from.from)
            //        .Include(to => to.to)
            //        .Include(presedanje => presedanje.presedanje)
            //            .ThenInclude(gradoviPresedanja => gradoviPresedanja.gradoviPresedanja)
            //        .Include(aeroplane => aeroplane.aeroplane)
            //        .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
            //        .Include(luggage => luggage.luggage)
            //        .Include(ocene => ocene.ocene)
            //        .ToListAsync();
            //}


            //return BadRequest();
        }

        [HttpPost]
        [Route("LanLng")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetLanLng(Address address)
        {
            var address1 = "Stavanger, Norway";

            AddressData addressData = new AddressData();
            addressData.City = "Stavanger";
            addressData.Country = "Norway";

            var locationService = new GoogleLocationService();
            MapPoint point;
            try
            {
                point = locationService.GetLatLongFromAddress(addressData);
            }
            catch (Exception e)
            {

                throw;
            }
            

            var latitude = point.Latitude;
            var longitude = point.Longitude;

            return Ok();
        }
    }
}