using automatic_road_ticket_system.Core.Enums;

namespace automatic_road_ticket_system.Core.Interfaces.JWT;

public interface IJsonWebTokenRepository
{
    string GenerateJwtToken(string email, Role role);
}
