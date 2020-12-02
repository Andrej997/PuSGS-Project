using Common.Models.Common;
using Common.Models.Common_U;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Models.Cars
{
	public class RentACarService
	{
		[Key]
		public int idRAC { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string LogoImage { get; set; }

		[ForeignKey("RACAddress")]
		public int RACaddressId { get; set; }
		public Address RACAddress { get; set; }
		public ICollection<Car> RACServiceCars { get; set; }
		public ICollection<Address> RACBranches { get; set; }
		public ICollection<Ocena> RACOcene { get; set; }
		public ICollection<Comment> RACComments { get; set; }
		public Cenovnik Cenovnik { get; set; }

		[ForeignKey("RACAdmin")]
		public string RACidAdmin { get; set; }
		public User RACAdmin { get; set; }

		public bool deleted { get; set; }
	}
}
