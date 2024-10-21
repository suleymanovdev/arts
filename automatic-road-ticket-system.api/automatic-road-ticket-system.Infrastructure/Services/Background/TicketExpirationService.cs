using automatic_road_ticket_system.Core.Enums;
using automatic_road_ticket_system.Infrastructure.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace automatic_road_ticket_system.Infrastructure.Services.Background;

public class TicketExpirationService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;

    public TicketExpirationService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await CheckForExpiredTickets();
            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }

    private async Task CheckForExpiredTickets()
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<DBContext>();

            var cutoff = DateTime.UtcNow;
            var expiredTickets = dbContext.Tickets.Where(t => t.ExpirationDate <= cutoff).ToList();

            if (expiredTickets.Any())
            {
                for (int i = 0; i < expiredTickets.Count; i++)
                {
                    var ticket = expiredTickets[i];
                    ticket.Status = TicketStatus.Expired;
                    dbContext.Tickets.Update(ticket);
                }
                await dbContext.SaveChangesAsync();
            }
        }
    }
}