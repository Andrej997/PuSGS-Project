using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Flights
{
    public class AvioSediste
    {
        [Key]
        public int id { get; set; }
        public bool reserved { get; set; }
        public bool isFastReservation { get; set; }
    }
}
