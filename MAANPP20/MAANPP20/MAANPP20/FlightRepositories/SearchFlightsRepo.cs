using MAANPP20.Data;
using MAANPP20.FlightInterfaces;
using MAANPP20.Models.Flights;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightRepositories
{
    public class SearchFlightsRepo : ISearchFlights
    {
        public async Task<ActionResult<IEnumerable<FlightCompany>>> GetFlightCompany(MAANPP20Context _context, SearchFlight search)
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


            return null;
        }

        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights(MAANPP20Context _context, SearchFlight search)
        {
            List<Flight> flights;
            if (search.selectType == 1)
            {
                return flights = await _context.Flights
                    .Where(x => x.deleted == false && x.company == search.inputSearch)
                    .Include(from => from.from)
                    .Include(to => to.to)
                    .Include(presedanje => presedanje.presedanje)
                        .ThenInclude(gradoviPresedanja => gradoviPresedanja.gradoviPresedanja)
                    .Include(aeroplane => aeroplane.aeroplane)
                    .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                    .Include(luggage => luggage.luggage)
                    .Include(ocene => ocene.ocene)
                    .ToListAsync();
            }
            else if (search.selectType == 2)
            {
                return flights = await _context.Flights
                    .Where(x => x.deleted == false && x.from.city == search.inputSearch)
                    .Include(from => from.from)
                    .Include(to => to.to)
                    .Include(presedanje => presedanje.presedanje)
                        .ThenInclude(gradoviPresedanja => gradoviPresedanja.gradoviPresedanja)
                    .Include(aeroplane => aeroplane.aeroplane)
                    .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                    .Include(luggage => luggage.luggage)
                    .Include(ocene => ocene.ocene)
                    .ToListAsync();
            }
            else if (search.selectType == 3)
            {
                return flights = await _context.Flights
                    .Where(x => x.deleted == false && x.to.city == search.inputSearch)
                    .Include(from => from.from)
                    .Include(to => to.to)
                    .Include(presedanje => presedanje.presedanje)
                        .ThenInclude(gradoviPresedanja => gradoviPresedanja.gradoviPresedanja)
                    .Include(aeroplane => aeroplane.aeroplane)
                    .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                    .Include(luggage => luggage.luggage)
                    .Include(ocene => ocene.ocene)
                    .ToListAsync();
            }


            return null;
        }
    }
}
