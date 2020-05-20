using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAANPP20.Models.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MAANPP20.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProbniController : ControllerBase
    {
        private UserManager<Proba> _userManager;

        public ProbniController(UserManager<Proba> userManager)
        {
            _userManager = userManager;
        }
        [HttpGet]
        //[Route("Register")]
        public async Task<ActionResult<IEnumerable<Proba>>> PostApplicationUser()
        {
            Console.WriteLine("str");
            return Ok();
        }
    }
}