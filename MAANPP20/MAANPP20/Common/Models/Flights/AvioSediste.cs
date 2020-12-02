﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Models.Flights
{
    public class AvioSediste
    {
        [Key]
        public int id { get; set; }
        public bool reserved { get; set; }
        public bool isFastReservation { get; set; }
        public bool isDisabled { get; set; }

        public bool deleted { get; set; }
    }
}
