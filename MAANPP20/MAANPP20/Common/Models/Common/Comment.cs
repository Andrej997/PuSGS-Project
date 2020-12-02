using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Models.Common
{
	public class Comment
	{
		[Key]
		public int idComment { get; set; }

		public int idUser { get; set; }

		public string Comm { get; set; }

		public bool deleted { get; set; }
	}
}
