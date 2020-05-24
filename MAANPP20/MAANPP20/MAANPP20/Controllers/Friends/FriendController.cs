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

            //var friendRequests = await _context.FriendRequests
            //    .Where(x => x.myId == user.Id)
            //    .Include(user => user.user)
            //    .ToListAsync();

            if (user == null)
            {
                return NotFound();
            }
            else if (user.deleted == true)
            {
                return NotFound();
            }

            //if (friendRequests == null) return NotFound();
            //else user.friendRequests = friendRequests;

            return user;
        }

        // GET: api/Friend/Awu
        [HttpGet("Awu/{email}")]
        public async Task<ActionResult<IEnumerable<User>>> GetWaitingUsers(string email)
        {
            var user = await _context.Users.Where(x => x.deleted == false)
                .FirstOrDefaultAsync(i => i.Email == email);

            var friendRequests = await _context.FriendRequests
                .Where(x => x.myId == user.Id && x.isRequest == false)
                .ToListAsync();

            var users = new List<User>();
            foreach (var friendRequest in friendRequests)
            {
                if (friendRequest.myId != null && friendRequest.hisId != null && friendRequest.isRequest == false)
                {
                    var tempUser = await _context.Users
                        .FirstOrDefaultAsync(i => i.Id == friendRequest.hisId);
                    users.Add(tempUser);
                }
                    
            }

            return users;
        }

        // PUT: api/Friend/AddToWL
        [HttpPost]
        [Route("SendReq")]
        public async Task<ActionResult<FriendRequest>> AddFriendRequest(FriendRequest friendRequest)
        {
            if (friendRequest.myId == friendRequest.hisId) return BadRequest();

            // ne moze da se posalje 2 puta isti zahtev
            if (FriendRequestExists(friendRequest.myId, friendRequest.hisId)) return BadRequest();

            var user = await _context.Users
                .Include(address => address.address)
                .Include(friends => friends.friends)
                .Include(friendRequests => friendRequests.friendRequests)
                .FirstOrDefaultAsync(i => i.Id == friendRequest.myId);

            if (user == null) return NotFound();

            user.friendRequests.Add(friendRequest);
            // ja sam poslao zahtev
            _context.FriendRequests.Add(friendRequest);

            await _context.SaveChangesAsync();

            var he = await _context.Users
                .Include(address => address.address)
                .Include(friends => friends.friends)
                .Include(friendRequests => friendRequests.friendRequests)
                .FirstOrDefaultAsync(i => i.Id == friendRequest.hisId);

            var hisFriendRequest = new FriendRequest();
            hisFriendRequest.myId = friendRequest.hisId;
            hisFriendRequest.hisId = friendRequest.myId;
            hisFriendRequest.isRequest = true;

            he.friendRequests.Add(hisFriendRequest);
            
            // on je primio zahtev
            _context.FriendRequests.Add(hisFriendRequest);
            
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool UserExists(string id) => _context.Users.Any(e => e.Id == id);

        private bool FriendRequestExists(string myId, string hisId) => 
            _context.FriendRequests.Any(e => e.myId == myId && e.hisId == hisId && e.isRequest == false);
    }
}