using automatic_road_ticket_system.Core.Enums;

namespace automatic_road_ticket_system.Core.Entities;

public class Ticket
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime IssueDate { get; set; }
    public DateTime ExpirationDate { get; set; }
    public TicketStatus Status { get; set; } = TicketStatus.Active;
    
    // User Information
    public Guid UserId { get; set; }
    public User User { get; set; }
    
    // Car Information
    public Guid CarId { get; set; }
    public Car Car { get; set; }
}