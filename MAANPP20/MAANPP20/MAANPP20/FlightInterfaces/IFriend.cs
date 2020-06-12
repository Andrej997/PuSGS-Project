using MAANPP20.Data;
using MAANPP20.Models.Common;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightInterfaces
{
    public interface IFriend
    {
        Task<ActionResult<User>> GetUser(MAANPP20Context _context, string email);
        Task<ActionResult<IEnumerable<User>>> GetWaitingUsers(MAANPP20Context _context, string email);
        Task<ActionResult<IEnumerable<User>>> GetFriendRequestUsers(MAANPP20Context _context, string email);
        Task<ActionResult<IEnumerable<User>>> GetFriendlist(MAANPP20Context _context, string email);
        Task<ActionResult<FriendRequest>> AddFriendRequest(MAANPP20Context _context, FriendRequest friendRequest);
        Task<ActionResult<Friend>> AddFriend(MAANPP20Context _context, string id);
        Task<ActionResult<FriendRequest>> DeleteFriendRequest(MAANPP20Context _context, string id);
        Task<Friend> DeleteFriend(MAANPP20Context _context, string id);
    }
}
