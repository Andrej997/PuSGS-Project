using MAANPP20.Data;
using Common.Models.Flights;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Common.Models.Common;

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
    }
}
