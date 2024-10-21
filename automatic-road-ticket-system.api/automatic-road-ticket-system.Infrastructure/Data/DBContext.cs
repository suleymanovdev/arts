using automatic_road_ticket_system.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace automatic_road_ticket_system.Infrastructure.Data;

public class DBContext : DbContext
{
    public DBContext(DbContextOptions<DBContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection"), b => b.MigrationsAssembly("automatic-road-ticket-system.WebApi"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(u => u.Cars)
            .WithOne(c => c.Owner)
            .HasForeignKey(c => c.OwnerId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<User>()
            .HasMany(t => t.Tickets)
            .WithOne(u => u.User)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Car>()
            .HasMany(t => t.Tickets)
            .WithOne(t => t.Car)
            .HasForeignKey(t => t.CarId)
            .OnDelete(DeleteBehavior.Cascade);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Car> Cars { get; set; }
    public DbSet<Ticket> Tickets { get; set; }
}