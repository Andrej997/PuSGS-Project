using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Flights
{
    public class FastFlightReservation
    {
        [Key]
        public int id { get; set; }

        public Flight flight { get; set; }

        public double price { get; set; }

        public int seatNumeration { get; set; }

        public int seatId { get; set; }

        public string UserIdForPOST { get; set; }

        public bool deleted { get; set; }
    }
}
