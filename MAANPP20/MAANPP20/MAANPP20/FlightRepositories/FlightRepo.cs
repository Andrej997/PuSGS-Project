using Common.Models.Flights;
using MAANPP20.Data;
using MAANPP20.FlightInterfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightRepositories
{
    public class FlightRepo : IFlight
    {
        public async Task<ActionResult<Flight>> AddFlight(MAANPP20Context _context, Flight flight)
        {
            var flightCompany = await _context.FlightCompanies
                .Include(address => address.address)
                .Include(destinations => destinations.destinations)
                .Include(flights => flights.flights)
                .Include(ocene => ocene.ocene)
                .FirstOrDefaultAsync(i => i.id == flight.idCompany);

            if (flightCompany == null)
            {
                return null;
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

            return flight;
        }

        public async Task<ActionResult<Flight>> DeleteFlight(MAANPP20Context _context, int id)
        {
            var flight = await _context.Flights
                .Include(presedanje => presedanje.presedanje)
                    .ThenInclude(gradoviPresedanja => gradoviPresedanja.gradoviPresedanja)
                .Include(luggage => luggage.luggage)
                .Include(ocene => ocene.ocene)
                .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                .FirstOrDefaultAsync(i => i.id == id);

            if (flight == null)
            {
                return null;
            }
            else if (flight.deleted == true)
            {
                return null;
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

            return flight;
        }

        public async Task<ActionResult<Flight>> GetFlight(MAANPP20Context _context, int id)
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
                    return null;
                }
                if (flight.deleted == true)
                {
                    return null;
                }
            }
            catch (Exception e)
            {

                throw;
            }

            return flight;
        }

        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights(MAANPP20Context _context)
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

        public async Task<ActionResult<Flight>> GetFlightSeats(MAANPP20Context _context, int id)
        {
            Flight flight = null;
            try
            {
                flight = await _context.Flights
                .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                .FirstOrDefaultAsync(i => i.id == id);

                if (flight == null)
                {
                    return null;
                }
            }
            catch (Exception e)
            {

                throw;
            }

            return flight;
        }

        public async Task<Flight> UpdateFlight(MAANPP20Context _context, Flight flight)
        {
            foreach (var seat in flight.allSeatsForThisFlight)
            {
                _context.Entry(seat).State = EntityState.Modified;
            }
            _context.Entry(flight).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightExists(_context, flight.id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return flight;
        }

        private bool FlightExists(MAANPP20Context _context, int id) => _context.Flights.Any(e => e.id == id);
    }
}
