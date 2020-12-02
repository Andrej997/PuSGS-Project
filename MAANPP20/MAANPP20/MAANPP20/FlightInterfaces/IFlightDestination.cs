using MAANPP20.Data;
using Common.Models.Flights;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MAANPP20.FlightInterfaces
{
    public interface IFlightDestination
    {
        Task<ActionResult<FlightDestination>> GetFlightDestination(MAANPP20Context _context, int id);
        Task<ActionResult<FlightDestination>> AddFlightCompany(MAANPP20Context _context, FlightDestination flightDestination);
        Task<FlightDestination> UpdateFlightCompany(MAANPP20Context _context, FlightDestination flightDestination);
        Task<ActionResult<FlightDestination>> DeleteFlightDestination(MAANPP20Context _context, int id);
    }
}
