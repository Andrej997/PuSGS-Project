using MAANPP20.Data;
using Common.Models.Flights;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MAANPP20.FlightInterfaces
{
    public interface IFlight
    {
        Task<ActionResult<IEnumerable<Flight>>> GetFlights(MAANPP20Context _context);
        Task<ActionResult<Flight>> GetFlight(MAANPP20Context _context, int id);
        Task<ActionResult<Flight>> GetFlightSeats(MAANPP20Context _context, int id);
        Task<ActionResult<Flight>> AddFlight(MAANPP20Context _context, Flight flight);
        Task<Flight> UpdateFlight(MAANPP20Context _context, Flight flight);
        Task<ActionResult<Flight>> DeleteFlight(MAANPP20Context _context, int id);
    }
}
