using MAANPP20.Data;
using MAANPP20.Models.Common;
using MAANPP20.Models.Flights;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightInterfaces
{
    public interface IFlightReservation
    {
        Task<ActionResult<IEnumerable<FlightReservation>>> GetFlightReservations(MAANPP20Context _context, string idUser);
        Task<ActionResult<FlightReservation>> AddFlightReservation(MAANPP20Context _context, FlightReservation flightReservation);
        Task<FlightReservation> UpdateFlightReservation(MAANPP20Context _context, FlightReservation flightReservation);
        Task<ActionResult<FlightReservation>> DeleteFlightReservation(MAANPP20Context _context, int id);
        Task<FriendForFlight> AcceptFriendForFlight(MAANPP20Context _context, StringForICollection invitationString);
        Task<FriendForFlight> DeclineFriendForFlight(MAANPP20Context _context, string invitationString);
        Task<ActionResult<IEnumerable<FriendForFlight>>> GetCallsForFlight(MAANPP20Context _context, string email);
        Task<ActionResult<IEnumerable<FlightReservation>>> GetFlightReservationsStatistics(MAANPP20Context _context, int idFlight);
        Task<ActionResult<IEnumerable<FriendForFlight>>> CheckAllReservations(MAANPP20Context _context);
    }
}
