namespace automatic_road_ticket_system.Core.Interfaces.OTP;

public interface IRegistrationOneTimePasswordRepository
{        
    Task<string> Create(string email);
    Task<bool> Verify(string email, Guid otp);
}