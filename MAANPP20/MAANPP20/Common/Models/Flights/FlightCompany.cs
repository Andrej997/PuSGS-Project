using Common.Models.Common;
using Common.Models.Common_U;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Models.Flights
{
    public class FlightCompany
    {
        [Key]
        public int id { get; set; }

        [Required]
        [StringLength(25)]
        public string name { get; set; }

        [ForeignKey("address")]
        public int addressId { get; set; }
        public Address address { get; set; }

        [Required]
        public string promotionalDesc { get; set; }

        public ICollection<FlightDestination> destinations { get; set; }

        public ICollection<Flight> flights { get; set; }

        public string logo { get; set; }

        public ICollection<DoubleForICollection> ocene { get; set; }

        [ForeignKey("admin")]
        public string idAdmin { get; set; }
        public User admin { get; set; }

        public bool deleted { get; set; }
    }
}
