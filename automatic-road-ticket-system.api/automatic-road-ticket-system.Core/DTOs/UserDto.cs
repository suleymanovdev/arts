namespace automatic_road_ticket_system.Core.DTOs;

public record UserDto
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Address { get; set; }
    public string FIN { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public DateTime? BirthDate { get; set; }
}
