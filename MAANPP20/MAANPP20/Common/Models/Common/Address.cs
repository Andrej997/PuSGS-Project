﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Models.Common
{
    public class Address
    {
        [Key]
        public int id { get; set; }

        public string streetAndNumber { get; set; }

        public string city { get; set; }

        public string country { get; set; }

        public bool deleted { get; set; }
    }
}
