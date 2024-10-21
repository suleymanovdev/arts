namespace automatic_road_ticket_system.Core.DTOs;

public record TicketDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid CarId { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime ExpirationDate { get; set; }
}