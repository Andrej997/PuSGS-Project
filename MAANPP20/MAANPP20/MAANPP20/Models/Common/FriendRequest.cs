using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Models.Common
{
    public class FriendRequest
    {
        [Key]
        public int id { get; set; }

        public string myId { get; set; }

        public string hisId { get; set; }

        // ako je false, znaci da sam ja poslao zahtev,
        // ako je true, znaci da je neko drugi poslao
        // meni zahtev
        public bool isRequest { get; set; } 
    }
}
