﻿using System.ComponentModel.DataAnnotations;

namespace MAANPP20.Models.Cars
{
	public class Ocena
	{
		[Key]
		public int idOcena { get; set; }

		public int broj { get; set; }

		public bool deleted { get; set; }
	}
}
