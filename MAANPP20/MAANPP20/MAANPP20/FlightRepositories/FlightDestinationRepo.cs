using Common.Models.Flights;
using MAANPP20.Data;
using MAANPP20.FlightInterfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightRepositories
{
    public class FlightDestinationRepo : IFlightDestination
    {
        public async Task<ActionResult<FlightDestination>> AddFlightCompany(MAANPP20Context _context, FlightDestination flightDestination)
        {
            var flightCompany = await _context.FlightCompanies
               .Include(address => address.address)
               .Include(destinations => destinations.destinations)
               .Include(flights => flights.flights)
               .Include(ocene => ocene.ocene)
               .FirstOrDefaultAsync(i => i.id == flightDestination.CompanyID);

            if (flightCompany == null)
            {
                return null;
            }

            //dodaj mu destinaciju i sacuvaj izmene u kompaniji
            flightCompany.destinations.Add(flightDestination);

            _context.FlightDestinations.Add(flightDestination);

            await _context.SaveChangesAsync();

            return flightDestination;
        }

        public async Task<ActionResult<FlightDestination>> DeleteFlightDestination(MAANPP20Context _context, int id)
        {
            var flightDestinaion = await _context.FlightDestinations
                .Include(address1 => address1.startAddress)
                .Include(address2 => address2.endAddress)
                .FirstOrDefaultAsync(i => i.id == id);

            if (flightDestinaion == null)
            {
                return null;
            }

            flightDestinaion.deleted = true;
            flightDestinaion.startAddress.deleted = true;
            flightDestinaion.endAddress.deleted = true;

            _context.Entry(flightDestinaion.startAddress).State = EntityState.Modified;
            _context.Entry(flightDestinaion.endAddress).State = EntityState.Modified;
            _context.Entry(flightDestinaion).State = EntityState.Modified;

            //_context.FlightDestinations.Remove(flightDestinaion);
            await _context.SaveChangesAsync();

            return flightDestinaion;
        }

        public async Task<ActionResult<FlightDestination>> GetFlightDestination(MAANPP20Context _context, int id)
        {
            var flightDestinaion = await _context.FlightDestinations
                .Include(address1 => address1.startAddress)
                .Include(address2 => address2.endAddress)
                .FirstOrDefaultAsync(i => i.id == id);

            if (flightDestinaion == null)
            {
                return null;
            }
            else if (flightDestinaion.deleted == true)
            {
                return null;
            }
            return flightDestinaion;
        }

        public async Task<FlightDestination> UpdateFlightCompany(MAANPP20Context _context, FlightDestination flightDestination)
        {
            _context.Entry(flightDestination.startAddress).State = EntityState.Modified;
            _context.Entry(flightDestination.endAddress).State = EntityState.Modified;
            _context.Entry(flightDestination).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightDestinationExists(_context, flightDestination.id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return flightDestination;
        }

        private bool FlightDestinationExists(MAANPP20Context _context, int id) => _context.FlightDestinations.Any(e => e.id == id);
    }
}
