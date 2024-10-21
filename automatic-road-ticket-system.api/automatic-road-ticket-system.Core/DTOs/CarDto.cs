using automatic_road_ticket_system.Core.Enums;

namespace automatic_road_ticket_system.Core.DTOs;

public record CarDto
{
    public string VIN { get; set; }
    public string RegistrationPlate { get; set; }
    public string RegistrationCertificate { get; set; }
    public string Color { get; set; }
    public DateTime YearOfManufacture { get; set; }
    public string Make { get; set; }
    public string Model { get; set; }
    public CarType Type { get; set; }
}