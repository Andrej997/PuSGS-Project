using Common.Models.Flights;
using MAANPP20.Data;
using MAANPP20.FlightInterfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.FlightRepositories
{
    public class PlaneRepo : IPlane
    {
        public async Task<ActionResult<Aeroplane>> AddPlane(MAANPP20Context _context, Aeroplane aeroplane)
        {
            _context.Aeroplanes.Add(aeroplane);

            await _context.SaveChangesAsync();

            return aeroplane;
        }

        public async Task<ActionResult<Aeroplane>> DeletePlane(MAANPP20Context _context, int id)
        {
            var plane = await _context.Aeroplanes
                .Where(x => x.deleted == false)
                .FirstOrDefaultAsync(i => i.id == id);

            if (plane == null)
            {
                return null;
            }
            else if (plane.deleted == true)
            {
                return null;
            }

            plane.deleted = true;

            _context.Entry(plane).State = EntityState.Modified;

            //_context.Aeroplanes.Remove(plane);
            await _context.SaveChangesAsync();

            return plane;
        }

        public async Task<ActionResult<Aeroplane>> GetAeroplane(MAANPP20Context _context, int id)
        {
            var aeroplane = await _context.Aeroplanes
                .Where(x => x.deleted == false)
                .FirstOrDefaultAsync(i => i.id == id);

            if (aeroplane == null)
            {
                return null;
            }
            return aeroplane;
        }

        public async Task<ActionResult<IEnumerable<Aeroplane>>> GetAeroplanes(MAANPP20Context _context)
        {
            return await _context.Aeroplanes
                .Where(x => x.deleted == false)
                .ToListAsync();
        }

        public async Task<Aeroplane> UpdatePlane(MAANPP20Context _context, Aeroplane aeroplane)
        {
            _context.Entry(aeroplane).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaneExists(_context, aeroplane.id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return aeroplane;
        }

        private bool PlaneExists(MAANPP20Context _context, int id) => _context.Aeroplanes.Any(e => e.id == id);
    }
}
