using automatic_road_ticket_system.Core.Interfaces.MAIL;
using automatic_road_ticket_system.Core.Interfaces.OTP;

namespace automatic_road_ticket_system.Infrastructure.Services.OTP;

public class RegistrationOneTimePasswordService
{
    private readonly IRegistrationOneTimePasswordRepository _registrationOneTimePasswordRepository;
    private readonly IMailService _mailService;

    public RegistrationOneTimePasswordService(IRegistrationOneTimePasswordRepository registrationOneTimePasswordRepository, IMailService mailService)
    {
        _registrationOneTimePasswordRepository = registrationOneTimePasswordRepository;
        _mailService = mailService;
    }

    public async Task<bool> Create(string email)
    {
        var otp = await _registrationOneTimePasswordRepository.Create(email);
        await _mailService.SendRegistrationVerification(email, otp);
        return true;
    }

    public async Task<bool> Verify(string email, Guid otp)
    {
        return await _registrationOneTimePasswordRepository.Verify(email, otp);
    }
}