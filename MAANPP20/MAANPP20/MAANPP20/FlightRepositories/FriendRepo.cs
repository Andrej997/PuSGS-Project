using Common.Models.Common;
using Common.Models.Common_U;
using MAANPP20.Data;
using MAANPP20.FlightInterfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightRepositories
{
    public class FriendRepo : IFriend
    {
        public async Task<ActionResult<Friend>> AddFriend(MAANPP20Context _context, string id)
        {
            if (id == null) return null;
            string myId = null;
            string hisId = null;
            try
            {
                myId = id.Split('|')[0];
                hisId = id.Split('|')[1];
            }
            catch
            {
                return null;
            }


            var user = await _context.Users.Where(x => x.deleted == false)
                .Include(address => address.address)
                .Include(friends => friends.friends)
                //.ThenInclude()
                .FirstOrDefaultAsync(i => i.Id == myId);
            if (user == null) return null;

            var friendUser = await _context.Users.Where(x => x.deleted == false)
                .Include(address => address.address)
                .Include(friends => friends.friends)
                .FirstOrDefaultAsync(i => i.Id == hisId);
            if (friendUser == null) return null;

            // dodajem njega kod sebe u listu prijatelja
            var friend = new Friend();
            friend.messages = new List<Message>();
            friend.myId = user.Id;
            friend.hisId = friendUser.Id;
            user.friends.Add(friend);

            //_context.Entry(user.friends).State = EntityState.Added;
            _context.Entry(user).State = EntityState.Modified;

            // sebe dodajem kod njega u listu prijatelja
            var friend2 = new Friend();
            friend2.messages = new List<Message>();
            friend2.myId = friendUser.Id;
            friend2.hisId = user.Id;
            friendUser.friends.Add(friend2);
            _context.Entry(friendUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!FlightExists(flight.id))
                //{
                return null;
                //}
                //else
                //{
                //    throw;
                //}
            }

            return friend;
        }

        public async Task<ActionResult<FriendRequest>> AddFriendRequest(MAANPP20Context _context, FriendRequest friendRequest)
        {
            if (friendRequest.myId == friendRequest.hisId) return null;

            // ne moze da se posalje 2 puta isti zahtev
            if (FriendRequestExists(_context, friendRequest.myId, friendRequest.hisId)) return null;

            var user = await _context.Users
                .Include(address => address.address)
                .Include(friends => friends.friends)
                .Include(friendRequests => friendRequests.friendRequests)
                .FirstOrDefaultAsync(i => i.Id == friendRequest.myId);

            if (user == null) return null;

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

            return friendRequest;
        }

        public async Task<Friend> DeleteFriend(MAANPP20Context _context, string id)
        {
            if (id == null) return null;

            string myId = id.Split('|')[0];
            string hisId = id.Split('|')[1];

            var friend = await _context.Friends.Where(x => x.deleted == false)
                .Include(messages => messages.messages)
                .FirstOrDefaultAsync(i => i.myId == myId && i.hisId == hisId);

            if (friend == null) return null;
            if (friend.deleted == true) return null;

            foreach (var message in friend.messages)
            {
                message.deleted = true;
                _context.Entry(message).State = EntityState.Modified;
            }

            friend.deleted = true;
            _context.Entry(friend).State = EntityState.Modified;

            var friend1 = await _context.Friends.Where(x => x.deleted == false)
                .Include(messages => messages.messages)
                .FirstOrDefaultAsync(i => i.myId == hisId && i.hisId == myId);

            if (friend1 == null) return null;
            if (friend1.deleted == true) return null;

            foreach (var message in friend1.messages)
            {
                message.deleted = true;
                _context.Entry(message).State = EntityState.Modified;
            }

            friend1.deleted = true;
            _context.Entry(friend1).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return friend;
        }

        public async Task<ActionResult<FriendRequest>> DeleteFriendRequest(MAANPP20Context _context, string id)
        {
            if (id == null) return null;
            string myId = id.Split('|')[0];
            string hisId = id.Split('|')[1];
            // vraca nam zahtev
            var friendRequest = await _context.FriendRequests
                .FirstOrDefaultAsync(i => i.hisId == hisId && i.myId == myId);
            if (friendRequest == null) return null;

            // vraca nam cekanje
            var waitingFriendRequest = await _context.FriendRequests
                .FirstOrDefaultAsync(i => i.hisId == myId && i.myId == hisId);
            if (waitingFriendRequest == null) return null;


            _context.FriendRequests.Remove(friendRequest);
            _context.FriendRequests.Remove(waitingFriendRequest);
            await _context.SaveChangesAsync();

            return friendRequest;
        }

        public async Task<ActionResult<IEnumerable<User>>> GetFriendlist(MAANPP20Context _context, string email)
        {
            var user = await _context.Users.Where(x => x.deleted == false)
                .Include(friends => friends.friends)
                .Include(friends => friends.friends)
                    .ThenInclude(messeges => messeges.messages)
                .FirstOrDefaultAsync(i => i.Email == email);

            var friends = new List<User>();
            foreach (var friend in user.friends)
            {
                if (friend.hisId != null)
                {
                    if (friend.deleted == false)
                    {
                        var tempUser = await _context.Users
                        .FirstOrDefaultAsync(i => i.Id == friend.hisId);
                        friends.Add(tempUser);
                    }
                }
            }

            return friends;
        }

        public async Task<ActionResult<IEnumerable<User>>> GetFriendRequestUsers(MAANPP20Context _context, string email)
        {
            var user = await _context.Users.Where(x => x.deleted == false)
                .FirstOrDefaultAsync(i => i.Email == email);

            var friendRequests = await _context.FriendRequests
                .Where(x => x.myId == user.Id && x.isRequest == true)
                .ToListAsync();

            var users = new List<User>();
            foreach (var friendRequest in friendRequests)
            {
                if (friendRequest.myId != null && friendRequest.hisId != null && friendRequest.isRequest == true)
                {
                    var tempUser = await _context.Users
                        .FirstOrDefaultAsync(i => i.Id == friendRequest.hisId);
                    users.Add(tempUser);
                }

            }

            return users;
        }

        public async Task<ActionResult<User>> GetUser(MAANPP20Context _context, string email)
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
                return null;
            }
            else if (user.deleted == true)
            {
                return null;
            }

            //if (friendRequests == null) return NotFound();
            //else user.friendRequests = friendRequests;

            return user;
        }

        public async Task<ActionResult<IEnumerable<User>>> GetWaitingUsers(MAANPP20Context _context, string email)
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

        private bool FriendRequestExists(MAANPP20Context _context, string myId, string hisId) =>
            _context.FriendRequests.Any(e => e.myId == myId && e.hisId == hisId && e.isRequest == false);
    }
}
