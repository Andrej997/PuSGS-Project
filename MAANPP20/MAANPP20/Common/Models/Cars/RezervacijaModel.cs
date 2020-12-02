namespace Common.Models.Cars
{
	public class RezervacijaModel
	{
		public string startDay { get; set; }
		public string endDay { get; set; }
		public string startTime { get; set; }
		public string endTime { get; set; }

		public string idCar { get; set; }
		public string idUser { get; set; }

	}
}
