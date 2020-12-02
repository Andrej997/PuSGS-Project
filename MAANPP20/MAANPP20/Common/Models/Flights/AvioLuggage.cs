using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Models.Flights
{
    public class AvioLuggage
    {
        [Key]
        public int id { get; set; }
        public double priceCarryOn { get; set; }
        public double pricePersonalBag { get; set; }
        public double priceFullSizeSpinner { get; set; }
        public double priceLargeDuffel { get; set; }

        public bool deleted { get; set; }
    }
}
