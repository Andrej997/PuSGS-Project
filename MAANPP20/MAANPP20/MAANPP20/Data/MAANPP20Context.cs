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
        // tabele koje imaju samo elementarna polja, tj. ne postoji strani kljuc
        public DbSet<AvioLuggage> AvioLuggages { get; set; }
        public DbSet<AvioSediste> AvioSedista { get; set; }
        public DbSet<StringForICollection> StringForICollections { get; set; }
        public DbSet<DoubleForICollection> DoubleForICollections { get; set; }


        // zadrze samo ICollection
        public DbSet<Aeroplane> Aeroplanes { get; set; }
        public DbSet<Presedanje> Presedanja { get; set; }

        // kompleksni tipovi
        public DbSet<FlightCompany> FlightCompanies { get; set; }
        public DbSet<FlightDestination> FlightDestinations { get; set; }
        #endregion

        #region Rent a car

        #endregion
    }
}
