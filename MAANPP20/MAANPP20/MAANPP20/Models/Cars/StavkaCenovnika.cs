using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Cars
{
	public class StavkaCenovnika
	{
		[Key]
		public int idStavkeCenovnika { get; set; }

		public string Naziv { get; set; }
		public int Vrednost { get; set; }

		public bool deleted { get; set; }
	}
}
