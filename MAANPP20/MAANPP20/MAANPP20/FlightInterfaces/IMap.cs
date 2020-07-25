using MAANPP20.Data;
using MAANPP20.Models.Common;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightInterfaces
{
    public interface IMap
    {
        Task<ActionResult<Address>> GetFlightCompanyAddress(MAANPP20Context _context, int id);
    }
}
