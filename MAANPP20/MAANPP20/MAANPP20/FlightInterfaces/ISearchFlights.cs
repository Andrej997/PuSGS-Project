using MAANPP20.Data;
using MAANPP20.Models.Flights;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightInterfaces
{
    public interface ISearchFlights
    {
        Task<ActionResult<IEnumerable<FlightCompany>>> GetFlightCompany(MAANPP20Context _context, SearchFlight search);
        Task<ActionResult<IEnumerable<Flight>>> GetFlights(MAANPP20Context _context, SearchFlight search);
    }
}
