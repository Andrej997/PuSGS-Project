using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MAANPP20.Models.Common
{
	public class Friend
	{
		[Key]
		public int id { get; set; }

		public string myId { get; set; }

		public string hisId { get; set; }

		public ICollection<Message> messages { get; set; }

		public bool deleted { get; set; }

		public Friend()
		{
			messages = new List<Message>();
			deleted = false;
		}
	}
}
