using Common.Models.Flights;
using MAANPP20.Data;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MAANPP20.FlightInterfaces
{
    public interface ISearchFlights
    {
        Task<ActionResult<IEnumerable<FlightCompany>>> GetFlightCompany(MAANPP20Context _context, SearchFlight search);
        Task<ActionResult<IEnumerable<Flight>>> GetFlights(MAANPP20Context _context, SearchFlight search);
    }
}
