using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Models.Cars
{
	public class CarModel
	{
		public string Brand { get; set; }
		public string Model { get; set; }
		public string Type { get; set; }
		public string Gear { get; set; }
		public string Fuel { get; set; }
		public string Year { get; set; }
		//public int Cm3 { get; set; }
		public string Kw { get; set; }
		public string Doors { get; set; }
		public string Seats { get; set; }
		//public int FreeSeats { get; set; }
		public string Trunk { get; set; }
		public string Price { get; set; }
		public string CarImg { get; set; }
		public string BabySeat { get; set; }
		public string Navigation { get; set; }
		public string RoofRack { get; set; }

		public int idService { get; set; }

	}
}
