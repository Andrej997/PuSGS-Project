using System;
using System.Threading.Tasks;
using CarMicroservice.Data;
using Common.Models.Cars;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarMicroservice.Controllers.Cars
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly MAANPP20ContextCar _context;
        public CarsController(MAANPP20ContextCar context)
        {
            _context = context;
        }


        // POST: api/Flight/AddF
        [HttpPost]
        [Route("AddCar")]
        public async Task<Object> AddCar(CarModel carModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var rentACarService = await _context.RentACarServices
                .Include(cars => cars.RACServiceCars)
                .Include(ocene => ocene.RACOcene)
                .Include(address => address.RACBranches)
                .Include(comments => comments.RACComments)
                .FirstOrDefaultAsync(i => i.idRAC == carModel.idService);

            if (rentACarService == null)
            {
                return BadRequest();
            }



            Car car = new Car();

            car.Model = carModel.Model;
            car.Brand = ReturnBrand(carModel.Brand);
            car.Type = ReturnType(carModel.Type);
            car.Gear = ReturnGear(carModel.Gear);
            car.Fuel = ReturnFuel(carModel.Fuel);
            car.Doors = ReturnDoor(carModel.Doors);
            car.Seats = ReturnSeat(carModel.Seats);
            car.Year = new DateTime(Int32.Parse(carModel.Year));
            car.Kw = Int32.Parse(carModel.Kw);
            double d = car.Kw * 1.56;
            car.Cm3 = Int32.Parse(Math.Ceiling(d).ToString());
            if (car.Seats == SeatsCarEnum.Two)
                car.FreeSeats = 2;
            else if (car.Seats == SeatsCarEnum.Four)
                car.FreeSeats = 4;
            else if (car.Seats == SeatsCarEnum.Five)
                car.FreeSeats = 5;
            else if (car.Seats == SeatsCarEnum.Six)
                car.FreeSeats = 6;
            else
                car.FreeSeats = 7;
            car.Trunk = Int32.Parse(carModel.Trunk);
            car.PricePerDay = Double.Parse(carModel.Price);
            car.CarImage = carModel.CarImg;
            car.BabySeat = StringToBool(carModel.BabySeat);
            car.Navigation = StringToBool(carModel.Navigation);
            car.RoofRack = StringToBool(carModel.RoofRack);
            car.deleted = false;


            //_context.Cars.Add(car);
            rentACarService.RACServiceCars.Add(car);

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

            //var cars = await _context.Cars.Where(x => x.deleted == false)
            //    .Include(ocene => ocene.OceneAuta)
            //    .Include(rezervacije => rezervacije.RezervacijeAutaOdDo)
            //    .ToListAsync();

            return car;

#pragma warning disable CS0162 // Unreachable code detected
            string message = "Uspesno";
#pragma warning restore CS0162 // Unreachable code detected
            return Ok(new { message });
            //return CreatedAtAction("GetFlight", new { id = flight.id }, flight);
            return BadRequest();
        }

        public BrandCarEnum ReturnBrand(string str)
        {
            switch (str)
            {
                case "AlfaRomeo":
                    return BrandCarEnum.AlfaRomeo;
                case "Audi":
                    return BrandCarEnum.Audi;
                case "BMW":
                    return BrandCarEnum.BMW;
                case "Citroen":
                    return BrandCarEnum.Citroen;
                case "Fiat":
                    return BrandCarEnum.Fiat;
                case "Ford":
                    return BrandCarEnum.Ford;
                case "Mercedes":
                    return BrandCarEnum.Mercedes;
                case "Peugeot":
                    return BrandCarEnum.Peugeot;
                case "Porsche":
                    return BrandCarEnum.Porsche;
                case "Toyota":
                    return BrandCarEnum.Toyota;
                case "Volkswagen":
                    return BrandCarEnum.Volkswagen;
                case "Volvo":
                    return BrandCarEnum.Volvo;
                case "Yugo":
                    return BrandCarEnum.Yugo;
                default:
                    return BrandCarEnum.Skoda;

            }
        }
        public TypeCarEnum ReturnType(string str)
        {
            switch (str)
            {
                case "Convertable":
                    return TypeCarEnum.Convertable;
                case "Crossoover":
                    return TypeCarEnum.Crossoover;
                case "Hatchback":
                    return TypeCarEnum.Hatchback;
                case "Luxuary":
                    return TypeCarEnum.Luxuary;
                case "Minivan":
                    return TypeCarEnum.Minivan;
                
                default:
                    return TypeCarEnum.Sedan;

            }
        }
        public GearCarEnum ReturnGear(string str)
        {
            switch (str)
            {
                case "Manual":
                    return GearCarEnum.Manual;
                default:
                    return GearCarEnum.Automatic;

            }
        }
        public DoorsCarEnum ReturnDoor(string str)
        {
            switch (str)
            {
                case "Two":
                    return DoorsCarEnum.Two;
                default:
                    return DoorsCarEnum.Four;

            }
        }
        public SeatsCarEnum ReturnSeat(string str)
        {
            switch (str)
            {
                case "Two":
                    return SeatsCarEnum.Two;
                case "Four":
                    return SeatsCarEnum.Four;
                case "Five":
                    return SeatsCarEnum.Five;
                case "Six":
                    return SeatsCarEnum.Six;
                default:
                    return SeatsCarEnum.Seven;

            }
        }
        public FuelCarEnum ReturnFuel(string str)
        {
            switch (str)
            {
                case "Persol":
                    return FuelCarEnum.Persol;
                case "Diesel":
                    return FuelCarEnum.Diesel;
                case "Electric":
                    return FuelCarEnum.Electric;
                default:
                    return FuelCarEnum.Hybrid;
            }
        }

        public bool StringToBool(string str)
        {
            if (str == "")
                return false;
            return true;
        }
    }
}