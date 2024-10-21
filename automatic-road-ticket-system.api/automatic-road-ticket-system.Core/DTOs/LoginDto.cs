namespace automatic_road_ticket_system.Core.DTOs;

public record LoginDto
{
    public string Email { get; init; }
    public string Password { get; init; }
}