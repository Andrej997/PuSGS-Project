using System.Threading.Tasks;
using Common.Models.Common;
using MAANPP20.Data;
using MAANPP20.FlightRepositories;
using Microsoft.AspNetCore.Mvc;

namespace MAANPP20.Controllers.Flights
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private MapRepo mapRepo = new MapRepo();
        private readonly MAANPP20Context _context;

        public MapController(MAANPP20Context context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetFlightCompanyAddress(int id)
        {
            return await mapRepo.GetFlightCompanyAddress(_context, id);
        }
    }
}