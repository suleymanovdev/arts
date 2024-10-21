using automatic_road_ticket_system.Core.Enums;

namespace automatic_road_ticket_system.Core.Entities;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Address { get; set; } = string.Empty;
    public string FIN { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime? BirthDate { get; set; }

    public List<Car> Cars { get; set; } = new List<Car>();
    public List<Ticket> Tickets { get; set; } = new List<Ticket>();
    
    public Role Role { get; set; } = Role.USER;
    public bool IsVerified { get; set; } = false;
    public DateTime? RegistrationDate { get; set; }

    public void SetRegistrationDate(DateTime dateTime)
    {
        RegistrationDate = dateTime.Kind == DateTimeKind.Utc ? dateTime : dateTime.ToUniversalTime();
    }
}