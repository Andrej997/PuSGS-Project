using System;
using System.Threading.Tasks;
using CarMicroservice.Data;
using Common.Models.Cars;
using Common.Models.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarMicroservice.Controllers.Cars
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        private readonly MAANPP20ContextCar _context;
        public BranchController(MAANPP20ContextCar context)
        {
            _context = context;
        }


        //// POST: api/Flight/AddBranch
        [HttpPost]
        [Route("AddBranch")]
        public async Task<Object> AddBranch(Branch model)
        {
            var rentACarService = await _context.RentACarServices
               .Include(cars => cars.RACServiceCars)
               .Include(ocene => ocene.RACOcene)
               .Include(address => address.RACBranches)
               .Include(comments => comments.RACComments)
               .FirstOrDefaultAsync(i => i.idRAC == model.idService);

            if (rentACarService == null)
            {
                return BadRequest();
            }

            var adr = new Address();
            adr.streetAndNumber = model.streetAndNumber;
            adr.city = model.city;
            adr.country = model.country;
            adr.deleted = false;

            //_context.Addresses.Add(adr);
            rentACarService.RACBranches.Add(adr);

            try
            {
                await _context.SaveChangesAsync();
            }
#pragma warning disable CS0168 // The variable 'e' is declared but never used
            catch (Exception e)
#pragma warning restore CS0168 // The variable 'e' is declared but never used
            {

                throw;
            }

            return adr;
        }

    }
}