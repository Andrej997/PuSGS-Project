﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Common
{
    public enum Role
    {
        admin = 1,
        adminA,
        adminM,
        registredUser,
        user
    }

    public class User : IdentityUser
    {
        [Required]
        [StringLength(25)]
        public string firstName { get; set; }

        [Required]
        [StringLength(25)]
        public string lastName { get; set; }

        //public string email { get; set; } //zakomentarisana polja vec postoje u IdentityUser-u

        //public string password { get; set; }

        //public string phoneNumber { get; set; }

        //[Required]
        public string profileImage { get; set; }

        //[Required]
        public Address address { get; set; }

        [Required]
        public Role role { get; set; }

        public string passportHash { get; set; }

        public string authData { get; set; }

        //public ICollection<Friend> friends { get; set; }

        //[ForeignKey("friendRequests")]
        //public int friendRequestsId { get; set; }
        //public ICollection<User> friendRequests { get; set; }

        //[ForeignKey("waitingForAccept")]
        //public int waitingForAcceptId { get; set; }
        //public ICollection<User> waitingForAccept { get; set; }


    }
}
