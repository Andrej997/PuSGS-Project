using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAANPP20.Data;
using MAANPP20.FlightRepositories;
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
        private FriendRepo friendRepo = new FriendRepo();
        private readonly MAANPP20Context _context;

        public FriendController(MAANPP20Context context)
        {
            _context = context;
        }

        // GET: api/Friend/don@john.com
        [HttpGet("{email}")]
        public async Task<ActionResult<User>> GetUser(string email)
        {
            var user = await friendRepo.GetUser(_context, email);
            if (user == null) return NotFound();
            return user;
            //var user = await _context.Users.Where(x => x.deleted == false)
            //    .Include(address => address.address)
            //    //.Include(friends => friends.friends)
            //    //    .ThenInclude()
            //    .FirstOrDefaultAsync(i => i.Email == email);

            ////var friendRequests = await _context.FriendRequests
            ////    .Where(x => x.myId == user.Id)
            ////    .Include(user => user.user)
            ////    .ToListAsync();

            //if (user == null)
            //{
            //    return NotFound();
            //}
            //else if (user.deleted == true)
            //{
            //    return NotFound();
            //}

            ////if (friendRequests == null) return NotFound();
            ////else user.friendRequests = friendRequests;

            //return user;
        }

        /// <summary>
        /// Vraca listu prijatelja koji mogu da prihavate moj zahtev
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        // GET: api/Friend/Awu
        [HttpGet("Awu/{email}")]
        public async Task<ActionResult<IEnumerable<User>>> GetWaitingUsers(string email)
        {
            return await friendRepo.GetWaitingUsers(_context, email);

            //var user = await _context.Users.Where(x => x.deleted == false)
            //    .FirstOrDefaultAsync(i => i.Email == email);

            //var friendRequests = await _context.FriendRequests
            //    .Where(x => x.myId == user.Id && x.isRequest == false)
            //    .ToListAsync();

            //var users = new List<User>();
            //foreach (var friendRequest in friendRequests)
            //{
            //    if (friendRequest.myId != null && friendRequest.hisId != null && friendRequest.isRequest == false)
            //    {
            //        var tempUser = await _context.Users
            //            .FirstOrDefaultAsync(i => i.Id == friendRequest.hisId);
            //        users.Add(tempUser);
            //    }

            //}

            //return users;
        }

        /// <summary>
        /// Vraca listu prijatelja koji su meni poslali zahtev
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        // GET: api/Friend/Awu
        [HttpGet("Fru/{email}")]
        public async Task<ActionResult<IEnumerable<User>>> GetFriendRequestUsers(string email)
        {
            return await friendRepo.GetFriendRequestUsers(_context, email);
            //var user = await _context.Users.Where(x => x.deleted == false)
            //    .FirstOrDefaultAsync(i => i.Email == email);

            //var friendRequests = await _context.FriendRequests
            //    .Where(x => x.myId == user.Id && x.isRequest == true)
            //    .ToListAsync();

            //var users = new List<User>();
            //foreach (var friendRequest in friendRequests)
            //{
            //    if (friendRequest.myId != null && friendRequest.hisId != null && friendRequest.isRequest == true)
            //    {
            //        var tempUser = await _context.Users
            //            .FirstOrDefaultAsync(i => i.Id == friendRequest.hisId);
            //        users.Add(tempUser);
            //    }

            //}

            //return users;
        }

        // GET: api/Friend/MyFriends
        [HttpGet("MyFriends/{email}")]
        public async Task<ActionResult<IEnumerable<User>>> GetFriendlist(string email)
        {
            return await friendRepo.GetFriendlist(_context, email);
            //var user = await _context.Users.Where(x => x.deleted == false)
            //    .Include(friends => friends.friends)
            //    .Include(friends => friends.friends)
            //        .ThenInclude(messeges => messeges.messages)
            //    .FirstOrDefaultAsync(i => i.Email == email);

            //var friends = new List<User>();
            //foreach (var friend in user.friends)
            //{
            //    if (friend.hisId != null)
            //    {
            //        if (friend.deleted == false)
            //        {
            //            var tempUser = await _context.Users
            //            .FirstOrDefaultAsync(i => i.Id == friend.hisId);
            //            friends.Add(tempUser);
            //        }
            //    }
            //}

            //return friends;
        }

        // POST: api/Friend/SendReq
        [HttpPost]
        [Route("SendReq")]
        public async Task<ActionResult<FriendRequest>> AddFriendRequest(FriendRequest friendRequest)
        {
            var friendRequestRet = await friendRepo.AddFriendRequest(_context, friendRequest);
            if (friendRequestRet == null) return BadRequest();
            return Ok();
            //if (friendRequest.myId == friendRequest.hisId) return BadRequest();

            //// ne moze da se posalje 2 puta isti zahtev
            //if (FriendRequestExists(friendRequest.myId, friendRequest.hisId)) return BadRequest();

            //var user = await _context.Users
            //    .Include(address => address.address)
            //    .Include(friends => friends.friends)
            //    .Include(friendRequests => friendRequests.friendRequests)
            //    .FirstOrDefaultAsync(i => i.Id == friendRequest.myId);

            //if (user == null) return NotFound();

            //user.friendRequests.Add(friendRequest);
            //// ja sam poslao zahtev
            //_context.FriendRequests.Add(friendRequest);

            //await _context.SaveChangesAsync();

            //var he = await _context.Users
            //    .Include(address => address.address)
            //    .Include(friends => friends.friends)
            //    .Include(friendRequests => friendRequests.friendRequests)
            //    .FirstOrDefaultAsync(i => i.Id == friendRequest.hisId);

            //var hisFriendRequest = new FriendRequest();
            //hisFriendRequest.myId = friendRequest.hisId;
            //hisFriendRequest.hisId = friendRequest.myId;
            //hisFriendRequest.isRequest = true;

            //he.friendRequests.Add(hisFriendRequest);

            //// on je primio zahtev
            //_context.FriendRequests.Add(hisFriendRequest);

            //await _context.SaveChangesAsync();

            //return Ok();
        }

        /// <summary>
        /// OVO JE ZAPRABO PUT ALI PUT, POST, GET SAMO OVDE NISU HTELI DA PRIME
        /// PARAMETAR, PA SAM MORAO DA ISKORISTIM DELETE JER ON JE 
        /// JEDINI PRIMAO?!?!
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // PUT: api/Friend
        [HttpDelete]
        [Route("AddFriend/{id}")]
        public async Task<ActionResult<FriendRequest>> AddFriend(string id)
        {
            var friendRequest = await friendRepo.AddFriend(_context, id);
            if (friendRequest == null) return BadRequest();
            return Ok();
            //if (id == null) return BadRequest();
            //string myId = null;
            //string hisId = null;
            //try
            //{
            //    myId = id.Split('|')[0];
            //    hisId = id.Split('|')[1];
            //}
            //catch
            //{
            //    return BadRequest();
            //}
            
            
            //var user = await _context.Users.Where(x => x.deleted == false)
            //    .Include(address => address.address)
            //    .Include(friends => friends.friends)
            //        //.ThenInclude()
            //    .FirstOrDefaultAsync(i => i.Id == myId);
            //if (user == null) return NotFound();

            //var friendUser = await _context.Users.Where(x => x.deleted == false)
            //    .Include(address => address.address)
            //    .Include(friends => friends.friends)
            //    .FirstOrDefaultAsync(i => i.Id == hisId);
            //if (friendUser == null) return NotFound();

            //// dodajem njega kod sebe u listu prijatelja
            //var friend = new Friend();
            //friend.messages = new List<Message>();
            //friend.myId = user.Id;
            //friend.hisId = friendUser.Id;
            //user.friends.Add(friend);

            ////_context.Entry(user.friends).State = EntityState.Added;
            //_context.Entry(user).State = EntityState.Modified;

            //// sebe dodajem kod njega u listu prijatelja
            //var friend2 = new Friend();
            //friend2.messages = new List<Message>();
            //friend2.myId = friendUser.Id;
            //friend2.hisId = user.Id;
            //friendUser.friends.Add(friend2);
            //_context.Entry(friendUser).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    //if (!FlightExists(flight.id))
            //    //{
            //        return NotFound();
            //    //}
            //    //else
            //    //{
            //    //    throw;
            //    //}
            //}

            //return Ok();
        }

        // DELETE: api/Friend/DeleteFriendRequest/1
        [HttpDelete]
        [Route("DeleteFriendRequest/{id}")]
        public async Task<ActionResult<FriendRequest>> DeleteFriendRequest(string id)
        {
            if (id == null) return BadRequest();
            var friendRequest = await friendRepo.DeleteFriendRequest(_context, id);
            if (friendRequest == null) return NotFound();
            return Ok();
            //if (id == null) return BadRequest();
            //string myId = id.Split('|')[0];
            //string hisId = id.Split('|')[1];
            //// vraca nam zahtev
            //var friendRequest = await _context.FriendRequests
            //    .FirstOrDefaultAsync(i => i.hisId == hisId && i.myId == myId);
            //if (friendRequest == null) return NotFound();

            //// vraca nam cekanje
            //var waitingFriendRequest = await _context.FriendRequests
            //    .FirstOrDefaultAsync(i => i.hisId == myId && i.myId == hisId);
            //if (waitingFriendRequest == null) return NotFound();


            //_context.FriendRequests.Remove(friendRequest);
            //_context.FriendRequests.Remove(waitingFriendRequest);
            //await _context.SaveChangesAsync();

            //return Ok();
        }

        [HttpDelete]
        [Route("DeleteFriend/{id}")]
        public async Task<IActionResult> DeleteFriend(string id)
        {
            if (id == null) return BadRequest();
            var friend = await friendRepo.DeleteFriend(_context, id);
            if (friend == null) return NotFound();
            return Ok();
            //if (id == null) return BadRequest();

            //string myId = id.Split('|')[0];
            //string hisId = id.Split('|')[1];

            //var friend = await _context.Friends.Where(x => x.deleted == false)
            //    .Include(messages => messages.messages)
            //    .FirstOrDefaultAsync(i => i.myId == myId && i.hisId == hisId);

            //if (friend == null) return BadRequest();
            //if (friend.deleted == true) return BadRequest();

            //foreach (var message in friend.messages)
            //{
            //    message.deleted = true;
            //    _context.Entry(message).State = EntityState.Modified;
            //}

            //friend.deleted = true;
            //_context.Entry(friend).State = EntityState.Modified;

            //var friend1 = await _context.Friends.Where(x => x.deleted == false)
            //    .Include(messages => messages.messages)
            //    .FirstOrDefaultAsync(i => i.myId == hisId && i.hisId == myId);

            //if (friend1 == null) return BadRequest();
            //if (friend1.deleted == true) return BadRequest();

            //foreach (var message in friend1.messages)
            //{
            //    message.deleted = true;
            //    _context.Entry(message).State = EntityState.Modified;
            //}

            //friend1.deleted = true;
            //_context.Entry(friend1).State = EntityState.Modified;

            //await _context.SaveChangesAsync();

            //return Ok();
        }

        private bool UserExists(string id) => _context.Users.Any(e => e.Id == id);

        private bool FriendRequestExists(string myId, string hisId) => 
            _context.FriendRequests.Any(e => e.myId == myId && e.hisId == hisId && e.isRequest == false);
    }
}