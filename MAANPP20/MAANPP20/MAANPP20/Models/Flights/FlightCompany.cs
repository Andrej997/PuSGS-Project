using MAANPP20.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Flights
{
    public class FlightCompany
    {
        [Key]
        public int id { get; set; }

        public string name { get; set; }

        [ForeignKey("address")]
        public int addressId { get; set; }
        public Address address { get; set; }

        public string promotionalDesc { get; set; }

        public ICollection<FlightDestination> destinations { get; set; }

        //public ICollection<Flight> flights { get; set; }

        //public string logo { get; set; }

        //public ICollection<DoubleForICollection> ocene { get; set; }
    }
}
