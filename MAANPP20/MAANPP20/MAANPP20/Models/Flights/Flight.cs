using MAANPP20.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Flights
{
    public class Flight
    {
        [Key]
        public int id { get; set; }

        public string company { get; set; }

        public int idCompany { get; set; }

        public string logo { get; set; }

        [ForeignKey("from")]
        public int addressFromId { get; set; }
        public Address from { get; set; }

        [ForeignKey("to")]
        public int addressToId { get; set; }
        public Address to { get; set; }

        public string destImg { get; set; }

        public DateTime datumPolaska { get; set; }

        public DateTime datumSletanja { get; set; }

        public double prise { get; set; }

        public double priceTwoWay { get; set; }

        public string vremePutovanja { get; set; }

        public double duzinaPutovanja { get; set; }

        [ForeignKey("presedanje")]
        public int presedanjeId { get; set; }
        public Presedanje presedanje { get; set; }

        [ForeignKey("aeroplane")]
        public int aeroplaneId { get; set; }
        public Aeroplane aeroplane { get; set; }

        [ForeignKey("luggage")]
        public int luggageId { get; set; }
        public AvioLuggage luggage { get; set; }

        public int numOfFastReseravtions { get; set; }

        public double discountForFastReservation { get; set; }

        public ICollection<DoubleForICollection> ocene { get; set; }

        public ICollection<AvioSediste> allSeatsForThisFlight { get; set; }

        public bool deleted { get; set; }
    }
}
