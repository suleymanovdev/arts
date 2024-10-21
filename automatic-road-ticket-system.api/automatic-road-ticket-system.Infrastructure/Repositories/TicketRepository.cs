using automatic_road_ticket_system.Core.DTOs;
using automatic_road_ticket_system.Core.Entities;
using automatic_road_ticket_system.Core.Enums;
using automatic_road_ticket_system.Core.Interfaces;
using automatic_road_ticket_system.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace automatic_road_ticket_system.Infrastructure.Repositories;

public class TicketRepository : ITicketRepository
{
    private readonly DBContext _context;
    
    public TicketRepository(DBContext context)
    {
        _context = context;
    }
    
    public Task<IEnumerable<Ticket>> GetTicketsAsync(Guid userId)
    {
        IEnumerable<Ticket> tickets = _context.Tickets.Where(t => t.UserId == userId);
        return Task.FromResult(tickets);
    }
    
    public Task<IEnumerable<Ticket>> GetActiveTicketsAsync(Guid userId)
    {
        IEnumerable<Ticket> tickets = _context.Tickets.Where(t => t.UserId == userId && t.Status == TicketStatus.Active);
        return Task.FromResult(tickets);
    }

    public Task<IEnumerable<Ticket>> GetExpiredTicketsAsync(Guid userId)
    {
        IEnumerable<Ticket> tickets = _context.Tickets.Where(t => t.UserId == userId && t.Status == TicketStatus.Expired);
        return Task.FromResult(tickets);
    }

    public Task<IEnumerable<Ticket>> GetCanceledTicketsAsync(Guid userId)
    {
        IEnumerable<Ticket> tickets = _context.Tickets.Where(t => t.UserId == userId && t.Status == TicketStatus.Cancelled);
        return Task.FromResult(tickets);
    }

    public Task<Ticket> GetTicketByIdAsync(Guid id)
    {
        Ticket ticket = _context.Tickets.FirstOrDefault(t => t.Id == id);
        return Task.FromResult(ticket);
    }

    public Task<Ticket> GetTicketByCarIdAsync(Guid carId)
    {
        Ticket ticket = _context.Tickets.FirstOrDefault(t => t.CarId == carId);
        return Task.FromResult(ticket);
    }

    public Task<Ticket> GetTicketByUserIdAsync(Guid userId)
    {
        Ticket ticket = _context.Tickets.FirstOrDefault(t => t.UserId == userId);
        return Task.FromResult(ticket);
    }

    public Task<Ticket> CreateTicketAsync(Ticket ticket)
    {
        _context.Tickets.Add(ticket);
        _context.SaveChanges();
        return Task.FromResult(ticket);
    }

    public Task<Ticket> UpdateTicketAsync(TicketDto ticket)
    {
        Ticket orgTicket = _context.Tickets.FirstOrDefault(t => t.Id == ticket.Id);

        orgTicket.IssueDate = ticket.IssueDate;
        orgTicket.ExpirationDate = ticket.ExpirationDate;
        orgTicket.Status = TicketStatus.Active;

        _context.SaveChanges();
        return Task.FromResult(orgTicket);
    }

    public Task<Ticket> DeleteTicketAsync(Guid id)
    {
        Ticket ticket = _context.Tickets.FirstOrDefault(t => t.Id == id);
        _context.Tickets.Remove(ticket);
        _context.SaveChanges();
        return Task.FromResult(ticket);
    }
    
    public Task<Ticket> CancelTicketAsync(Guid id)
    {
        Ticket ticket = _context.Tickets.FirstOrDefault(t => t.Id == id);
        ticket.Status = TicketStatus.Cancelled;
        _context.SaveChanges();
        return Task.FromResult(ticket);
    }
}