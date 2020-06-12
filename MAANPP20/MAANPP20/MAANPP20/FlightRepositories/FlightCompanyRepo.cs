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
    public class FlightCompanyRepo : IFlightCompany
    {
        public async Task<ActionResult<FlightCompany>> AddFlightCompany(MAANPP20Context _context, FlightCompany flightCompany)
        {
            _context.FlightCompanies.Add(flightCompany);

            await _context.SaveChangesAsync();

            return flightCompany;
        }

        public async Task<ActionResult<FlightCompany>> DeleteFlightCompany(MAANPP20Context _context, int id)
        {
            var flightCompany = await _context.FlightCompanies
                .Include(address => address.address)
                .Include(destinations => destinations.destinations)
                    .ThenInclude(startAddr => startAddr.startAddress)
                .Include(destinations => destinations.destinations)
                    .ThenInclude(endAddr => endAddr.endAddress)
                .Include(flights => flights.flights)
                    .ThenInclude(allSeats => allSeats.allSeatsForThisFlight)
                .Include(admin => admin.admin)
                .Include(ocene => ocene.ocene)
                .FirstOrDefaultAsync(i => i.id == id);

            if (flightCompany == null)
            {
                return null;
            }
            else if (flightCompany.deleted == true)
            {
                return null;
            }

            flightCompany.admin.serviceId = 0;
            _context.Entry(flightCompany.admin).State = EntityState.Modified;

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

            return flightCompany;
        }

        public async Task<ActionResult<FlightCompany>> GetFlightCompany(MAANPP20Context _context, int id)
        {
            var flightCompany = await _context.FlightCompanies.Where(x => x.deleted == false)
                .Include(admin => admin.admin)
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
                return null;
            }
            else if (flightCompany.deleted == true)
            {
                return null;
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

        public async Task<ActionResult<IEnumerable<FlightCompany>>> GetFlightCompany(MAANPP20Context _context)
        {
            var flightCompanies = await _context.FlightCompanies.Where(x => x.deleted == false)
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

        public async Task<ActionResult<int>> GetUsersFlightCompanyId(MAANPP20Context _context, string id)
        {
            var flightCompany = await _context.FlightCompanies.Where(x => x.deleted == false)
                .Include(admin => admin.admin)
                .FirstOrDefaultAsync(i => i.idAdmin == id);

            if (flightCompany == null)
            {
                return 0;
            }
            else if (flightCompany.deleted == true)
            {
                return 0;
            }
            return flightCompany.id;
        }

        public async Task<FlightCompany> UpdateFlightCompany(MAANPP20Context _context, FlightCompany flightCompany)
        {
            if (flightCompany.admin != null)
            {
                flightCompany.admin.serviceId = flightCompany.id;
                _context.Entry(flightCompany.admin).State = EntityState.Modified;
            }

            _context.Entry(flightCompany.address).State = EntityState.Modified;
            _context.Entry(flightCompany).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightCompanyExists(_context, flightCompany.id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return flightCompany;
        }

        private bool FlightCompanyExists(MAANPP20Context _context, int id) => _context.FlightCompanies.Any(e => e.id == id);
    }
}
