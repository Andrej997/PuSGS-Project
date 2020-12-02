using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Models.Flights
{
    public class FriendForFlight
    {
        [Key]
        public int id { get; set; }

        public string email { get; set; }

        public string ime { get; set; }

        public string prezime { get; set; }

        public int seatNumber { get; set; }

        public int seatId { get; set; }

        public string invitationString { get; set; }

        public DateTime reservationDate { get; set; }

        public bool acceptedCall { get; set; }

        public bool deleted { get; set; }
    }
}
