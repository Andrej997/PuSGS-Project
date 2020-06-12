using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAANPP20.Data;
using MAANPP20.Models.Cars;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MAANPP20.Controllers.Cars
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        public CityController(MAANPP20Context context)
        {
            _context = context;
        }
        [HttpGet]
        //[Route("GetRentACarServices")]
        public async Task<ActionResult<IEnumerable<Grad>>> GetCities()
        {
            var cities = await _context.Gradovi//.Where(x => x.deleted == false)
                .ToListAsync();

            var pom = new List<Grad>();
            foreach (var city in cities)
                    pom.Add(city);

            return pom;
        }
    }
}