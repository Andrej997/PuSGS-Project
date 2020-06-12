using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Cars
{
	public class Cenovnik
	{
		[Key]
		public int idCenovnik { get; set; }

		public ICollection<StavkaCenovnika> StavkeCenovnika { get; set; }

		public bool deleted { get; set; }
	}
}
