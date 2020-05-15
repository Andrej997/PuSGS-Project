using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Common
{
    public enum Role
    {
        admin = 1,
        adminA,
        adminM,
        user
    }

    public class User
    {
        public string firstName { get; set; }

        public string lastName { get; set; }

        public string email { get; set; }

        public string passwordHash { get; set; }

        public string profileImage { get; set; }

        public Address address { get; set; }

        public Role role { get; set; }

        public string passportHash { get; set; }
    }
}
