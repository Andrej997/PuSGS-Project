using MAANPP20.Data;
using MAANPP20.Models.Flights;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightInterfaces
{
    public interface IPlane
    {
        Task<ActionResult<IEnumerable<Aeroplane>>> GetAeroplanes(MAANPP20Context _context);

        Task<ActionResult<Aeroplane>> GetAeroplane(MAANPP20Context _context, int id);

        Task<ActionResult<Aeroplane>> AddPlane(MAANPP20Context _context, Aeroplane aeroplane);

        Task<Aeroplane> UpdatePlane(MAANPP20Context _context, Aeroplane aeroplane);

        Task<ActionResult<Aeroplane>> DeletePlane(MAANPP20Context _context, int id);
    }
}
