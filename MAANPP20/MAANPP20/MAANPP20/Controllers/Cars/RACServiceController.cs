using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;
using MAANPP20.Data;
using MAANPP20.Models.Cars;
using MAANPP20.Models.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MAANPP20.Controllers.Cars
{
    [Route("api/[controller]")]
    [ApiController]
    public class RACServiceController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        public RACServiceController(MAANPP20Context context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetRentACarServices")]
        public async Task<ActionResult<IEnumerable<RentACarService>>> GetRentACarServices()
        {
            var services = await _context.RentACarServices.Where(x => x.deleted == false)
                .Include(cars => cars.RACServiceCars)
                .Include(address => address.RACAddress)
                .Include(cenovnik => cenovnik.Cenovnik)
                .ThenInclude(stavke => stavke.StavkeCenovnika)
                .Include(ocene => ocene.RACOcene)
                .Include(comments => comments.RACComments)
                .Include(admin => admin.RACAdmin)
                .Include(branches => branches.RACBranches)
                .ToListAsync();

            var pom = new List<RentACarService>();
            foreach (var service in services)
                if (service.deleted == false && service.RACAdmin != null)
                    pom.Add(service);

            return pom;
        }
        
        [HttpGet("{id}")]
        //[Route("GetRentACarService")]
        public async Task<Object> GetRentACarService(string id)
        {
            var service = await _context.RentACarServices.Where(x => x.deleted == false)
                .Include(cars => cars.RACServiceCars)
                .Include(address => address.RACAddress)
                .Include(cenovnik => cenovnik.Cenovnik)
                .ThenInclude(stavke => stavke.StavkeCenovnika)
                .Include(ocene => ocene.RACOcene)
                .Include(comments => comments.RACComments)
                .Include(admin => admin.RACAdmin)
                .Include(branches => branches.RACBranches)
                .FirstOrDefaultAsync(i => i.idRAC.ToString() == id);

            if (service != null)
                return service;

            else
                return NotFound();

            //RentACarService service = null;
            //try
            //{
            //    service = await _context.RentACarServices.Where(x => x.deleted == false)
            //    .Include(cars => cars.RACServiceCars)
            //    .Include(address => address.RACBranches)
            //    .Include(ocene => ocene.RACOcene)
            //    .Include(comments => comments.RACComments)
            //    .FirstOrDefaultAsync(i => i.idRAC.ToString() == id);

            //    if (service == null)
            //    {
            //        return NotFound();
            //    }
            //    if (service.deleted == true)
            //    {
            //        return NotFound();
            //    }
            //}
            //catch (Exception e)
            //{

            //    throw;
            //}

            //return service;
        }
        // POST: api/Flight/AddRACS
        [HttpPost]
        [Route("AddRACS")]
        public async Task<Object> AddRACService(RentACarModel model)
        {
            //int id = Int32.Parse(model.idAdmin);

            User tmpUser = await _context.Users
                 .Include(address => address.address)
                 //.Include(friends => friends.friends)
                 //.Include(friendRequests => friendRequests.friendRequests)
                 .FirstOrDefaultAsync(i => i.Id == model.idAdmin);

            if(tmpUser == null)
            {
                return BadRequest("Ne postoji korisnik!");
            }

            RentACarService rac = new RentACarService();
            Address adr = new Address();
            Cenovnik cen = new Cenovnik();
            cen.StavkeCenovnika = new List<StavkaCenovnika>();
            StavkaCenovnika stavka1 = new StavkaCenovnika();
            StavkaCenovnika stavka2 = new StavkaCenovnika();
            StavkaCenovnika stavka3 = new StavkaCenovnika();
            StavkaCenovnika stavka4 = new StavkaCenovnika();
            StavkaCenovnika stavka5 = new StavkaCenovnika();

            rac.Name = model.Name;
            rac.Description = model.Description;
            rac.LogoImage = model.LogoImage;

            adr.city = model.city;
            adr.country = model.country;
            adr.streetAndNumber = model.streetAndNumber;
            adr.deleted = false;

            rac.RACAddress = adr;
            
            stavka1.Naziv = "BabySeat";
            stavka1.Vrednost = Int32.Parse(model.BabySeat);
            stavka1.deleted = false;
            cen.StavkeCenovnika.Add(stavka1);
            stavka2.Naziv = "Navigation";
            stavka2.Vrednost = Int32.Parse(model.Navigation);
            stavka2.deleted = false;
            cen.StavkeCenovnika.Add(stavka2);
            stavka3.Naziv = "Roof";
            stavka3.Vrednost = Int32.Parse(model.Roof);
            stavka3.deleted = false;
            cen.StavkeCenovnika.Add(stavka3);
            stavka4.Naziv = "Luxuary";
            stavka4.Vrednost = Int32.Parse(model.Luxuary);
            stavka4.deleted = false;
            cen.StavkeCenovnika.Add(stavka4);
            stavka5.Naziv = "Discount";
            stavka5.Vrednost = Int32.Parse(model.Discount);
            stavka5.deleted = false;
            cen.StavkeCenovnika.Add(stavka5);
            cen.deleted = false;

            rac.Cenovnik = cen;

            rac.RACidAdmin = tmpUser.Id;

            Grad pom = await _context.Gradovi
                 .FirstOrDefaultAsync(i => i.city == adr.city);

            if(pom == null)
            {
                Grad grad = new Grad();
                grad.city = adr.city;
                grad.description = "Promotivni opis. . .";
                grad.images = model.LogoImage;

                _context.Gradovi.Add(grad);
            }

            _context.RentACarServices.Add(rac);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw;
            }
            return rac;
        }
    }
}