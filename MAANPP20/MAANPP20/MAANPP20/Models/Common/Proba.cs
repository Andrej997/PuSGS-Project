using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Common
{
	public class Proba
	{
		[Key]
		public int Id { get; set; }
		public string First { get; set; }
	}
}
