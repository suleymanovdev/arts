using automatic_road_ticket_system.Core.DTOs;
using automatic_road_ticket_system.Core.Entities;

namespace automatic_road_ticket_system.Core.Interfaces;

public interface ITicketRepository
{
    Task<IEnumerable<Ticket>> GetTicketsAsync(Guid userId);
    Task<IEnumerable<Ticket>> GetActiveTicketsAsync(Guid userId);
    Task<IEnumerable<Ticket>> GetExpiredTicketsAsync(Guid userId);
    Task<IEnumerable<Ticket>> GetCanceledTicketsAsync(Guid userId);
    Task<Ticket> GetTicketByIdAsync(Guid id);
    Task<Ticket> GetTicketByCarIdAsync(Guid carId);
    Task<Ticket> GetTicketByUserIdAsync(Guid userId);
    Task<Ticket> CreateTicketAsync(Ticket ticket);
    Task<Ticket> UpdateTicketAsync(TicketDto ticket);
    Task<Ticket> DeleteTicketAsync(Guid id);
    Task<Ticket> CancelTicketAsync(Guid id);
}