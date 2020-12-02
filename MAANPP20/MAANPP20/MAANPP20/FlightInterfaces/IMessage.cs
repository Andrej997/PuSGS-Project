using Common.Models.Common;
using MAANPP20.Data;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MAANPP20.FlightInterfaces
{
    public interface IMessage
    {
        Task<ActionResult<IEnumerable<Message>>> GetUser(MAANPP20Context _context, string id);
        Task<ActionResult<Message>> AddFriendRequest(MAANPP20Context _context, Message message);
    }
}
