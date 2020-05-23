using System;
using System.ComponentModel.DataAnnotations;

namespace MAANPP20.Models.Common
{
	public class Message
	{
		[Key]
		public int id { get; set; }

		[Required]
		public string text { get; set; }

		[Required]
		public DateTime dateTime { get; set; }

		[Required]
		public bool isUnread { get; set; }
	}
}
