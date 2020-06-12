using MAANPP20.Data;
using MAANPP20.Models.Flights;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightInterfaces
{
    public interface IFlightCompany
    {
        Task<ActionResult<IEnumerable<FlightCompany>>> GetFlightCompany(MAANPP20Context _context);
        Task<ActionResult<FlightCompany>> GetFlightCompany(MAANPP20Context _context, int id);
        Task<ActionResult<FlightCompany>> AddFlightCompany(MAANPP20Context _context, FlightCompany flightCompany);
        Task<FlightCompany> UpdateFlightCompany(MAANPP20Context _context, FlightCompany flightCompany);
        Task<ActionResult<FlightCompany>> DeleteFlightCompany(MAANPP20Context _context, int id);
        Task<ActionResult<int>> GetUsersFlightCompanyId(MAANPP20Context _context, string id);
    }
}
