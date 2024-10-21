using automatic_road_ticket_system.Infrastructure.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace automatic_road_ticket_system.Infrastructure.Services.Background;

public class VerificationTimeoutService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;

    public VerificationTimeoutService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await CheckForUnverifiedUsers();
            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }

    private async Task CheckForUnverifiedUsers()
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<DBContext>();

            var cutoff = DateTime.UtcNow.Subtract(TimeSpan.FromMinutes(5));
            var unverifiedUsers = dbContext.Users.Where(u => !u.IsVerified && u.RegistrationDate <= cutoff).ToList();

            if (unverifiedUsers.Any())
            {
                for (int i = 0; i < unverifiedUsers.Count; i++)
                {
                    var user = unverifiedUsers[i];
                    dbContext.Users.Remove(user);
                }
                dbContext.Users.RemoveRange(unverifiedUsers);
                await dbContext.SaveChangesAsync();
            }
        }
    }
}