using MAANPP20.Models.Common;
using MAANPP20.Models.Flights;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MAANPP20.Data
{
    public class MAANPP20Context : DbContext
    {
        public MAANPP20Context(DbContextOptions<MAANPP20Context> options) 
            : base(options) { }

        #region Common
        public DbSet<Address> Addresses { get; set; }
        #endregion

        #region Flights
        public DbSet<FlightCompany> FlightCompanies { get; set; }

        #endregion

        #region Rent a car

        #endregion
    }
}
