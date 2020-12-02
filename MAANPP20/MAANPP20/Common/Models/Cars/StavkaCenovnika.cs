using System.ComponentModel.DataAnnotations;

namespace Common.Models.Cars
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
