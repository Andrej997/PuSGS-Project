using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Models.Common
{
    public class DoubleForICollection
    {
        [Key]
        public int id { get; set; }

        public double DoubleValue { get; set; }

        public bool deleted { get; set; }
    }
}
