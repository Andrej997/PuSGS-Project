using System;
using System.ComponentModel.DataAnnotations;

namespace Common.Models.Cars
{
	public class RezervacijaOdDo
	{
		[Key]
		public int idRezervacijaOdDo { get; set; }
		public DateTime Od { get; set; }
		public DateTime Do { get; set; }
		public bool deleted { get; set; }

	}
}
