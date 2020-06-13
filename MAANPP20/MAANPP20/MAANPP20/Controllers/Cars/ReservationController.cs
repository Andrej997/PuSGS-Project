using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAANPP20.Data;
using MAANPP20.Models.Cars;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MAANPP20.Controllers.Cars
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        public ReservationController(MAANPP20Context context)
        {
            _context = context;
        }

        // POST: api/Reservation/AddF
        [HttpPost]
        [Route("AddReservation")]
        public async Task<Object> AddReservation(RezervacijaModel model)//"2020-06-13" "10:00"
        {
            var car = await _context.Cars
                .Include(rezervacija => rezervacija.RezervacijeAutaOdDo)
                .FirstOrDefaultAsync(i => i.idCar.ToString() == model.idCar);

            //var user = await _context.Users
            //   .Include(rezervacijaUser => rezervacijaUser.rentACarReservation)
            //   .FirstOrDefaultAsync(iUser => iUser.Id.ToString() == model.idUser);

            if (car == null)
            {
                return BadRequest();
            }

            string[] datum;
            datum = model.startDay.Split('-');
            string[] vreme;
            vreme = model.startTime.Split(':');

            RezervacijaOdDo rez = new RezervacijaOdDo();
            rez.Od = new DateTime(Int32.Parse(datum[0]),
                                  Int32.Parse(datum[1]),
                                  Int32.Parse(datum[2]),
                                  Int32.Parse(vreme[0]),
                                  Int32.Parse(vreme[1]),
                                  0);
            rez.Do = new DateTime(Int32.Parse(model.endDay.Split('-')[0]),
                                  Int32.Parse(model.endDay.Split('-')[1]),
                                  Int32.Parse(model.endDay.Split('-')[2]),
                                  Int32.Parse(model.endTime.Split(':')[0]),
                                  Int32.Parse(model.endTime.Split(':')[1]),
                                  0);
            rez.deleted = false;
            car.RezervacijeAutaOdDo.Add(rez);
            //user.rentACarReservation.Add(rez);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw;
            }

            return car;
        }
    }
}