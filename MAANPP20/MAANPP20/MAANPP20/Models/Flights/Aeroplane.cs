using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Flights
{
    public class Aeroplane
    {
        [Key]
        public int id { get; set; }

        //[Required]
        public string name { get; set; }

        //[Required]
        public int numSeats { get; set; }

        public ICollection<AvioSediste> allSeats { get; set; }

        public bool deleted { get; set; }
    }
}
