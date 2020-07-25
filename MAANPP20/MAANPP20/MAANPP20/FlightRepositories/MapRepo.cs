using MAANPP20.Data;
using MAANPP20.FlightInterfaces;
using MAANPP20.Models.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightRepositories
{
    public class MapRepo : IMap
    {
        public async Task<ActionResult<Address>> GetFlightCompanyAddress(MAANPP20Context _context, int id)
        {
            var flightCompany = await _context.FlightCompanies
                 .Include(address => address.address)
                 .FirstOrDefaultAsync(i => i.id == id);

            if (flightCompany == null)
            {
                return null;
            }
            else if (flightCompany.deleted == true)
            {
                return null;
            }

            return flightCompany.address;
        }
    }
}
