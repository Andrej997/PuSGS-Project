using System;
using System.ComponentModel.DataAnnotations;

namespace Common.Models.Common
{
	public class Message
	{
		[Key]
		public int id { get; set; }

		public string text { get; set; }

		public DateTime dateTime { get; set; }

		public string myId { get; set; }

		public string hisId { get; set; }

		public bool isUnread { get; set; }

		public bool deleted { get; set; }

		public Message()
		{
			deleted = false;
		}
	}
}
