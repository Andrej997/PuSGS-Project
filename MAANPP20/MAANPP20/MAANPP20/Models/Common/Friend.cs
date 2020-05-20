﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MAANPP20.Models.Common
{
	public class Friend
	{
		[Required]
		public User user { get; set; }

		public ICollection<Message> messages { get; set; }

	}
}
