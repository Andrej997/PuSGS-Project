using MAANPP20.Data;
using MAANPP20.Models.Flights;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightInterfaces
{
    public interface IFastFlightReservation
    {
        Task<ActionResult<IEnumerable<FastFlightReservation>>> GetFastFlightReservations(MAANPP20Context _context, string idUser);
        Task<ActionResult<FastFlightReservation>> AddFastFlightReservations(MAANPP20Context _context, FastFlightReservation fastFlightReservation);
        Task<FastFlightReservation> UpdateFastFlightReservation(MAANPP20Context _context, FastFlightReservation fastFlightReservation);
        Task<ActionResult<FastFlightReservation>> DeleteFastFlightReservation(MAANPP20Context _context, int id);
        Task<ActionResult<IEnumerable<FastFlightReservation>>> GetFastFlightReservationsStatistics(MAANPP20Context _context, int idFlight);
    }
}
