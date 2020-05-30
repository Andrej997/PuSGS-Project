using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Common
{
	public class LoginModel
	{
		public string email { get; set; }
		public string password { get; set; }
		public string IdToken { get; set; }
	}
}
