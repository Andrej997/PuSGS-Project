using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAANPP20.Data;
using MAANPP20.Models.Cars;
using MAANPP20.Models.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MAANPP20.Controllers.Cars
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        public BranchController(MAANPP20Context context)
        {
            _context = context;
        }


        // POST: api/Flight/AddBranch
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
            catch (Exception e)
            {

                throw;
            }

            return adr;
        }

    }
}