using MAANPP20.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Flights
{
    public class FlightDestination
    {
        [Key]
        public int destinationid { get; set; }

        // [ForeignKey] on the foreign key property in the dependent entity
        [ForeignKey("startAddress")]
        public int sId { get; set; }
        public Address startAddress { get; set; }

        [ForeignKey("endAddress")]
        public int eId { get; set; }
        public Address endAddress { get; set; }
    }
}
