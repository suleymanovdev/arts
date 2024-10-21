using automatic_road_ticket_system.Core.Interfaces.OTP;
using Microsoft.Extensions.Caching.Memory;

namespace automatic_road_ticket_system.Infrastructure.Repositories.OTP;

public class RegistrationOneTimePasswordRepository : IRegistrationOneTimePasswordRepository
{
    private readonly IMemoryCache _memoryCache;

    public RegistrationOneTimePasswordRepository(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
    }

    public Task<string> Create(string email)
    {
        var otp = Guid.NewGuid().ToString();
        _memoryCache.Set(email, otp, TimeSpan.FromMinutes(5));

        return Task.FromResult(otp);
    }

    public Task<bool> Verify(string email, Guid otp)
    {
        if (_memoryCache.TryGetValue(email, out string cachedOtp) && cachedOtp == otp.ToString())
        {
            _memoryCache.Remove(email);

            return Task.FromResult(true);
        }

        return Task.FromResult(false);
    }
}