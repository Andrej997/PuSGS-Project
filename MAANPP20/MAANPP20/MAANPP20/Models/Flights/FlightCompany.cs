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

        [ForeignKey("addressId")]
        public int addressId { get; set; }

        [NotMapped]
        public Address address { get; set; }

        public string promotionalDesc { get; set; }

        //public HashSet<FlightDestination> destinations { get; set; }

        //public HashSet<Flight> flights { get; set; }

        //public HashSet<AvioSediste> sedista { get; set; }

        //public string logo { get; set; }

        //public HashSet<double> ocene { get; set; }
    }
}
