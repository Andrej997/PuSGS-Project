using Common.Models.Common;
using MAANPP20.Data;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MAANPP20.FlightInterfaces
{
    public interface IMap
    {
        Task<ActionResult<Address>> GetFlightCompanyAddress(MAANPP20Context _context, int id);
    }
}
