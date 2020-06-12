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
    public class MessageController : ControllerBase
    {
        private MessageRepo messageRepo = new MessageRepo();
        private readonly MAANPP20Context _context;

        public MessageController(MAANPP20Context context)
        {
            _context = context;
        }

        // GET: api/Message/44asda6s4d6as8d
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetUser(string id)
        {
            var messages = await messageRepo.GetUser(_context, id);
            if (messages == null) return NotFound();
            return messages;
            //if (id == null) return BadRequest();
            //string myId = id.Split('|')[0];
            //string hisId = id.Split('|')[1];

            //var messages = await _context.Messages
            //    .Where(x => x.deleted == false && x.myId == myId && x.hisId == hisId)
            //    .ToListAsync();

            //if (messages == null)
            //{
            //    return NotFound();
            //}

            //return messages;
        }

        // POST: api/Message/SaveMessage
        [HttpPost]
        [Route("SaveMessage")]
        public async Task<ActionResult<FriendRequest>> AddFriendRequest(Message message)
        {
            if (message.myId == message.hisId) return BadRequest();
            var retVal = await messageRepo.AddFriendRequest(_context, message);
            if (retVal == null) return NotFound();
            return Ok();
            //if (message.myId == message.hisId) return BadRequest();

            //var user = await _context.Users
            //    .Include(address => address.address)
            //    .Include(friends => friends.friends)
            //        .ThenInclude(messages => messages.messages)
            //    .FirstOrDefaultAsync(i => i.Id == message.myId);

            //if (user == null) return NotFound();

            //foreach (var friend in user.friends)
            //{
            //    if (friend.deleted == false)
            //        if (friend.hisId == message.hisId)
            //            friend.messages.Add(message);
            //}
            //// ja sam poslao zahtev
            //_context.Messages.Add(message);

            //var he = await _context.Users
            //    .Include(address => address.address)
            //    .Include(friends => friends.friends)
            //        .ThenInclude(messages => messages.messages)
            //    .FirstOrDefaultAsync(i => i.Id == message.hisId);


            //if (he == null) return NotFound();

            //var tempMessage = new Message();
            //tempMessage.hisId = message.myId;
            //tempMessage.myId = message.hisId;
            //tempMessage.isUnread = message.isUnread;
            //tempMessage.dateTime = message.dateTime;
            //tempMessage.text = message.text;
            //foreach (var friend in he.friends)
            //{
            //    if (friend.deleted == false)
            //        if (friend.myId == message.hisId)
            //            friend.messages.Add(tempMessage);
            //}
            //// ja sam poslao zahtev
            //_context.Messages.Add(tempMessage);

            //await _context.SaveChangesAsync();

            //return Ok();
        }
    }
}