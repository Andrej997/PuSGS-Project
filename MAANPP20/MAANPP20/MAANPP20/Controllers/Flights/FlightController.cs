using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAANPP20.Data;
using MAANPP20.Models.Common;
using MAANPP20.Models.Flights;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MAANPP20.Controllers.Flights
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly MAANPP20Context _context;
        public FlightController(MAANPP20Context context)
        {
            _context = context;
        }

        // GET: api/Flight
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
            var flights = await _context.Flights.Where(x => x.deleted == false)
                .Include(from => from.from)
                .Include(to => to.to)
                .Include(presedanje => presedanje.presedanje)
                .ThenInclude(gradoviPresedanja => gradoviPresedanja.gradoviPresedanja)
                .Include(aeroplane => aeroplane.aeroplane)
                .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                .Include(luggage => luggage.luggage)
                .Include(ocene => ocene.ocene)
                .ToListAsync();

            var retFlights = new List<Flight>();
            foreach (var flight in flights)
                if (flight.deleted == false)
                    retFlights.Add(flight);

            return retFlights;
        }   

        // GET: api/Flight/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Flight>> GetFlight(int id)
        {
            Flight flight = null;
            try
            {
                flight = await _context.Flights.Where(x => x.deleted == false)
                .Include(from => from.from)
                .Include(to => to.to)
                .Include(presedanje => presedanje.presedanje)
                .ThenInclude(gradoviPresedanja => gradoviPresedanja.gradoviPresedanja)
                .Include(aeroplane => aeroplane.aeroplane)
                .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                .Include(luggage => luggage.luggage)
                .Include(ocene => ocene.ocene)
                .FirstOrDefaultAsync(i => i.id == id);

                if (flight == null)
                {
                    return NotFound();
                }
                if (flight.deleted == true)
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {

                throw;
            }
            
            return flight;
        }

        // GET: api/Flight/Seats/1
        [HttpGet("Seats/{id}")]
        public async Task<ActionResult<Flight>> GetFlightSeats(int id)
        {
            Flight flight = null;
            try
            {
                flight = await _context.Flights
                .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                .FirstOrDefaultAsync(i => i.id == id);

                if (flight == null)
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {

                throw;
            }

            return flight;
        }

        // POST: api/Flight/AddF
        [HttpPost]
        [Route("AddF")]
        public async Task<ActionResult<Flight>> AddFlight(Flight flight)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (ValidateModel(flight))
            {
                // daj mi komapniju
                var flightCompany = await _context.FlightCompanies
                .Include(address => address.address)
                .Include(destinations => destinations.destinations)
                .Include(flights => flights.flights)
                .Include(ocene => ocene.ocene)
                .FirstOrDefaultAsync(i => i.id == flight.idCompany);

                if (flightCompany == null)
                {
                    return BadRequest();
                }

                // posto vec postoje sa primarnim kljucevima
                flight.addressFromId = flight.from.id;
                flight.addressToId = flight.to.id;
                flight.aeroplaneId = flight.aeroplane.id;

                //dodaj mu destinaciju i sacuvaj izmene u kompaniji
                flightCompany.flights.Add(flight);

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {

                    throw;
                }

                return CreatedAtAction("GetFlight", new { id = flight.id }, flight);
            }
            else return BadRequest();
        }

        // PUT: api/Flight
        [HttpPut]
        public async Task<IActionResult> UpdateFlight(Flight flight)
        {
            //if (ValidateModel(flightCompany, false))
            //{
                _context.Entry(flight).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FlightExists(flight.id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return Ok();
            //}
            //else return BadRequest();
        }


        // DELETE: api/Flight/DeleteFlight/1
        [HttpDelete]
        [Route("DeleteFlight/{id}")]
        public async Task<ActionResult<Flight>> DeleteFlight(int id)
        {
            var flight = await _context.Flights
                .Include(presedanje => presedanje.presedanje)
                    .ThenInclude(gradoviPresedanja => gradoviPresedanja.gradoviPresedanja)
                .Include(luggage => luggage.luggage)
                .Include(ocene => ocene.ocene)
                .Include(allSeatsForThisFlight => allSeatsForThisFlight.allSeatsForThisFlight)
                .FirstOrDefaultAsync(i => i.id == id);

            if (flight == null)
            {
                return NotFound();
            }
            else if (flight.deleted == true)
            {
                return NotFound();
            }

            flight.deleted = true;
            foreach (var seat in flight.allSeatsForThisFlight)
            {
                seat.deleted = true;
            }

            flight.presedanje.deleted = true;
            foreach (var gradPresedanja in flight.presedanje.gradoviPresedanja)
                gradPresedanja.deleted = true;

            flight.luggage.deleted = true;

            // TO DO: brisanje ocena

            _context.Entry(flight).State = EntityState.Modified;
            //_context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ValidateModel(Flight flight)
        {
            if (flight.datumPolaska > flight.datumSletanja) return false;

            // ne moze se kreirati polazak leta u proslosti kao ni sletanje, 
            // bar za sad ne!
            if (flight.datumPolaska < DateTime.Now) return false;
            if (flight.datumSletanja < DateTime.Now) return false;

            // recimo da cena ne moze da bude veca od milion $
            if (flight.prise < 0 || flight.prise > 1000000) return false;
            if (flight.priceTwoWay < 0 || flight.priceTwoWay > 1000000) return false;

            // TO DO: Vreme putovanja

            if (flight.duzinaPutovanja < 0 || flight.duzinaPutovanja > 1000000) return false;

            // ako se ne poklapa broj presedanja sa listom gradova
            if (flight.presedanje.brojPresedanja != flight.presedanje.gradoviPresedanja.Count) 
                if ((flight.presedanje.gradoviPresedanja as List<StringForICollection>).ElementAt(0).PlainString != "NONE") return false;
            
            // ne dozvoljam da postoji vise od 5 presedanja
            if (flight.presedanje.brojPresedanja < 0 || flight.presedanje.brojPresedanja > 5) return false;
            foreach (var presedanje in flight.presedanje.gradoviPresedanja)
                if (presedanje.PlainString == "" || presedanje.PlainString == " " || presedanje.PlainString == null) return false;

            // prilikom odabira avio mora biti isti broj sedista, 
            // jer ne moze da bude npr. ako avio ima 100 sedista a da za let budu omogucene vise od 100
            // opet, mogu biti slobodnih mesta manje od ukupnog kapaciteta, ali opet mora postojati isti broj
            if (flight.aeroplane == null) return false;
            if (flight.aeroplane.numSeats != flight.allSeatsForThisFlight.Count) return false;

            if ((flight.luggage.priceCarryOn < 0 || flight.luggage.priceCarryOn > 1000) ||
                (flight.luggage.priceFullSizeSpinner < 0 || flight.luggage.priceFullSizeSpinner > 1000) ||
                (flight.luggage.priceLargeDuffel < 0 || flight.luggage.priceLargeDuffel > 1000) ||
                (flight.luggage.pricePersonalBag < 0 || flight.luggage.pricePersonalBag > 1000)) return false;

            if (flight.numOfFastReseravtions < 0 || flight.numOfFastReseravtions > flight.aeroplane.numSeats) return false;

            // popust realno ne moze biti manji od 0 ili veci od 100 %
            if (flight.discountForFastReservation < 0 || flight.discountForFastReservation > 100) return false;

            // prilikom POST i PUT ne moze se logicki obrisati jer to je namenjeno za DELETE!
            if (flight.deleted == true) return false;

            return true;
        }

        private bool FlightExists(int id) => _context.Flights.Any(e => e.id == id);
    }
}