namespace automatic_road_ticket_system.Core.Interfaces.MAIL;

public interface IMailService
{
    Task SendRegistrationVerification(string email, string otp);
}