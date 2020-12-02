using System.Collections.Generic;
using System.Threading.Tasks;
using CarMicroservice.Data;
using Common.Models.Cars;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarMicroservice.Controllers.Cars
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly MAANPP20ContextCar _context;
        public CityController(MAANPP20ContextCar context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("GetRentACarServices")]
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