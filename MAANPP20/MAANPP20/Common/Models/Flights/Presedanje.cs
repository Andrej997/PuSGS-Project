using Common.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Models.Flights
{
    public class Presedanje
    {
        [Key]
        public int id { get; set; }

        public int brojPresedanja { get; set; }

        public ICollection<StringForICollection> gradoviPresedanja { get; set; }

        public bool deleted { get; set; }
    }
}
