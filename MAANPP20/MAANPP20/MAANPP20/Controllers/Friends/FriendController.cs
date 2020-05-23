using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAANPP20.Data;
using MAANPP20.Models.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MAANPP20.Controllers.Friends
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendController : ControllerBase
    {
        private readonly MAANPP20Context _context;

        public FriendController(MAANPP20Context context)
        {
            _context = context;
        }

        // GET: api/Friend/don@john.com
        [HttpGet("{email}")]
        public async Task<ActionResult<User>> GetUser(string email)
        {
            var user = await _context.Users.Where(x => x.deleted == false)
                .Include(address => address.address)
                //.Include(friends => friends.friends)
                //    .ThenInclude()
                .FirstOrDefaultAsync(i => i.Email == email);

            if (user == null)
            {
                return NotFound();
            }
            else if (user.deleted == true)
            {
                return NotFound();
            }

            return user;
        }

        // GET: api/Friend/Awu
        [HttpGet("Awu/{email}")]
        public async Task<ActionResult<User>> GetWaitingUsers(string email)
        {
            var user = await _context.Users
                .Include(waitingForAccept => waitingForAccept.waitingForAccept)
                //.Include(friends => friends.friends)
                //    .ThenInclude()
                .FirstOrDefaultAsync(i => i.Email == email);

            if (user == null)
            {
                return NotFound();
            }
            else if (user.deleted == true)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Friend/AddToWL
        [HttpPut]
        [Route("AddToWL")]
        public async Task<IActionResult> UpdateFlightCompany(User user)
        {
            foreach (var userWhoIsWaiting in user.waitingForAccept)
            {
                //admin.serviceId = flightCompany.id;
                _context.Entry(userWhoIsWaiting).State = EntityState.Modified;
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        private bool UserExists(string id) => _context.Users.Any(e => e.Id == id);
    }
}