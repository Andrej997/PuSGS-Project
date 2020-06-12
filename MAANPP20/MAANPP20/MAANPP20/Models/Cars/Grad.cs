using System.ComponentModel.DataAnnotations;

namespace MAANPP20.Models.Cars
{
	public class Grad
	{
		[Key]
		public int id { get; set; }
		public string city { get; set; }
		public string description { get; set; }
		public string images { get; set; }
	}
}
