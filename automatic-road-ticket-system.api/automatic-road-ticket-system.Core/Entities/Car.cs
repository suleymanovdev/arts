using automatic_road_ticket_system.Core.Enums;

namespace automatic_road_ticket_system.Core.Entities;

public class Car
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string VIN { get; set; }
    public string RegistrationPlate { get; set; }
    public string RegistrationCertificate { get; set; }
    public string Color { get; set; }
    public DateTime YearOfManufacture { get; set; }
    public string Make { get; set; }
    public string Model { get; set; }
    public CarType Type { get; set; }
    public Guid OwnerId { get; set; }
    public User Owner { get; set; }
    
    public List<Ticket> Tickets { get; set; } = new List<Ticket>();
}