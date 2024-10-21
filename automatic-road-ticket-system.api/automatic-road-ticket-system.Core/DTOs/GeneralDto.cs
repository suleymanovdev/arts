using automatic_road_ticket_system.Core.Enums;

namespace automatic_road_ticket_system.Core.DTOs;

public record GeneralDto
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Address { get; set; }
    public string FIN { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public DateTime? BirthDate { get; set; }
    public string VIN { get; set; }
    public string RegistrationPlate { get; set; }
    public string RegistrationCertificate { get; set; }
    public string Color { get; set; }
    public DateTime YearOfManufacture { get; set; }
    public string Make { get; set; }
    public string Model { get; set; }
    public CarType Type { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime ExpirationDate { get; set; }
    public TicketStatus Status { get; set; }
}