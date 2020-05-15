using MAANPP20.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Flights
{
    public class Presedanje
    {
        [Key]
        public int id { get; set; }

        public int brojPresedanja { get; set; }

        public ICollection<StringForICollection> gradoviPresedanja { get; set; }
    }
}
