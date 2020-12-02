using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Common.Models.Cars
{
	public enum BrandCarEnum
	{
		AlfaRomeo = 1,
		Audi,
		BMW,
		Citroen,
		Fiat,
		Ford,
		Mercedes,
		Peugeot,
		Porsche,
		Toyota,
		Volkswagen,
		Volvo,
		Yugo,
		Skoda
	}
	public enum TypeCarEnum
	{
		Convertable = 1,
		Crossoover,
		Hatchback,
		Luxuary,
		Minivan,
		Sedan
	}
	public enum GearCarEnum
	{
		Manual = 1,
		Automatic
	}
	public enum DoorsCarEnum
	{
		Two = 1,
		Four
	}
	public enum SeatsCarEnum
	{
		Two = 1,
		Four,
		Five,
		Six,
		Seven,
	}
	public enum FuelCarEnum
	{
		Persol = 1,
		Diesel,
		Electric,
		Hybrid
	}
	public class Car
	{
		[Key]
		public int idCar { get; set; }

		public int idService { get; set; }
		public BrandCarEnum Brand { get; set; }
		public string Model { get; set; }
		public TypeCarEnum Type { get; set; }
		public GearCarEnum Gear { get; set; }
		public FuelCarEnum Fuel { get; set; }
		public DateTime Year { get; set; }
		public int Cm3 { get; set; }
		public int Kw { get; set; }
		public DoorsCarEnum Doors { get; set; }
		public SeatsCarEnum Seats { get; set; }
		public int FreeSeats { get; set; }
		public int Trunk { get; set; }
		public ICollection<Ocena> OceneAuta { get; set; }
		public ICollection<RezervacijaOdDo> RezervacijeAutaOdDo { get; set; }
		public double PricePerDay { get; set; }
		public string CarImage { get; set; }
		public bool BabySeat { get; set; }
		public bool Navigation { get; set; }
		public bool RoofRack { get; set; }

		public bool deleted { get; set; }


	}
}
