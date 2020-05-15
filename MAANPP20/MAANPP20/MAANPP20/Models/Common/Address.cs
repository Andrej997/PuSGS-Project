using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Common
{
    public class Address
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string streetAndNumber { get; set; }

        [Required]
        public string city { get; set; }

        [Required]
        public string country { get; set; }
    }
}
