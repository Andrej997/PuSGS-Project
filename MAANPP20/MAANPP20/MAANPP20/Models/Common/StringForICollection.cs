using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Common
{
    public class StringForICollection
    {
        [Key]
        public int id { get; set; }

        public string PlainString { get; set; }

        public bool deleted { get; set; }
    }
}
