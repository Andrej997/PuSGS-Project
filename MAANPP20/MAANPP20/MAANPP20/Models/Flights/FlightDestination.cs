using MAANPP20.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Flights
{
    public class FlightDestination
    {
        [Key]
        public int id { get; set; }

        // [ForeignKey] on the foreign key property in the dependent entity
        [ForeignKey("startAddress")]
        public int sId { get; set; }
        public Address startAddress { get; set; }

        [ForeignKey("endAddress")]
        public int eId { get; set; }
        public Address endAddress { get; set; }

        // dodao da bih pri kreiranju dodelio kljuc kompanije, da bih poslao samo jedan parametar.
        // Stoji NotMapped jer ne zelim da ga mapiram u bazi, posto vec postoji iz veze 1:N izmedju kompanije i destinacije
        [NotMapped]
        public int CompanyID { get; set; }

        public bool deleted { get; set; }
    }
}
