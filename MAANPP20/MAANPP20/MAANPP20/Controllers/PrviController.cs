using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAANPP20.Data;
using MAANPP20.Models.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MAANPP20.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrviController : ControllerBase
    {
        //private UserManager<User> _userManager;
        private readonly MAANPP20Context _context;
        public PrviController(MAANPP20Context context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<Object> Metoda(Proba str)
        {
            Console.WriteLine(str);
            return Ok();
        }

    }
}