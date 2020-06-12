using MAANPP20.Data;
using MAANPP20.Models.Flights;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
