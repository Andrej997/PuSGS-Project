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

        public int flightId { get; set; }

        public double price { get; set; }

        public int seatNumeration { get; set; }

        public int seatId { get; set; }

        public string UserIdForPOST { get; set; }

        public bool userBonus { get; set; }

        public int ocenaLeta { get; set; }

        public int ocenaKompanije { get; set; }

        public DateTime dateNow { get; set; }

        public bool deleted { get; set; }
    }
}
