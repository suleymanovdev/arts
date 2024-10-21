namespace automatic_road_ticket_system.Core.DTOs;

public record SignupDto
{
    public string Name { get; init; }
    public string Surname { get; init; }
    public string Email { get; init; }
    public string Password { get; init; }
    public string ConfirmPassword { get; init; }
}