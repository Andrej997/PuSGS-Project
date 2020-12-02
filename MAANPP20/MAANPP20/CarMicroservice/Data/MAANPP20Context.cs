using Common.Models.Cars;
using Common.Models.Common;
using Common.Models.Common_U;
using Microsoft.EntityFrameworkCore;

namespace CarMicroservice.Data
{
    public class MAANPP20ContextCar : DbContext
    {
        public MAANPP20ContextCar(DbContextOptions<MAANPP20ContextCar> options) 
            : base(options) { }

        #region Common
        public DbSet<Address> Addresses { get; set; }
        public DbSet<User> Users { get; set; }
        #endregion

        #region Rent a car
        public DbSet<Car> Cars { get; set; }
        public DbSet<Ocena> OcenePojedinacnogAuta { get; set; }
        public DbSet<RezervacijaOdDo> RezervacijeOdDo { get; set; }
        public DbSet<RentACarService> RentACarServices { get; set; }
        public DbSet<Grad> Gradovi { get; set; }
        #endregion
    }
}
