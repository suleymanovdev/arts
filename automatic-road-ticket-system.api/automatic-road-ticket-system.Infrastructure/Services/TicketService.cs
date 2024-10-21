using automatic_road_ticket_system.Core.DTOs;
using automatic_road_ticket_system.Core.Entities;
using automatic_road_ticket_system.Core.Interfaces;

namespace automatic_road_ticket_system.Infrastructure.Services;

public class TicketService
{
    private readonly ITicketRepository _ticketRepository;
    
    public TicketService(ITicketRepository ticketRepository)
    {
        _ticketRepository = ticketRepository;
    }
    
    public async Task<IEnumerable<Ticket>> GetTicketsAsync(Guid userId)
    {
        return await _ticketRepository.GetTicketsAsync(userId);
    }

    public async Task<IEnumerable<Ticket>> GetActiveTicketsAsync(Guid userId)
    {
        return await _ticketRepository.GetActiveTicketsAsync(userId);
    }

    public async Task<IEnumerable<Ticket>> GetExpiredTicketsAsync(Guid userId)
    {
        return await _ticketRepository.GetExpiredTicketsAsync(userId);
    }

    public async Task<IEnumerable<Ticket>> GetCanceledTicketsAsync(Guid userId)
    {
        return await _ticketRepository.GetCanceledTicketsAsync(userId);
    }

    public async Task<Ticket> GetTicketByIdAsync(Guid id)
    {
        return await _ticketRepository.GetTicketByIdAsync(id);
    }

    public async Task<Ticket> GetTicketByCarIdAsync(Guid carId)
    {
        return await _ticketRepository.GetTicketByCarIdAsync(carId);
    }

    public async Task<Ticket> GetTicketByUserIdAsync(Guid userId)
    {
        return await _ticketRepository.GetTicketByUserIdAsync(userId);
    }

    public async Task<Ticket> CreateTicketAsync(Ticket ticket)
    {
        return await _ticketRepository.CreateTicketAsync(ticket);
    }

    public async Task<Ticket> UpdateTicketAsync(TicketDto ticket)
    {
        return await _ticketRepository.UpdateTicketAsync(ticket);
    }

    public async Task<Ticket> DeleteTicketAsync(Guid id)
    {
        return await _ticketRepository.DeleteTicketAsync(id);
    }
    
    public async Task<Ticket> CancelTicketAsync(Guid id)
    {
        return await _ticketRepository.CancelTicketAsync(id);
    }
}