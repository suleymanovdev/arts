using AutoMapper;
using automatic_road_ticket_system.Core.DTOs;
using automatic_road_ticket_system.Core.Entities;
using automatic_road_ticket_system.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace automatic_road_ticket_system.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TicketController(
    IMapper mapper,
    UserService userService,
    CarService carService,
    TicketService ticketService)
    : ControllerBase
{
    [HttpGet("{ticketId}/get-user-car-ticket-data")]
    public async Task<IActionResult> GetUserCarTicketData(Guid ticketId)
    {
        var ticket = await ticketService.GetTicketByIdAsync(ticketId);
        if (ticket == null)
        {
            return NotFound("Ticket not found");
        }
        
        var user = await userService.GetUserById(ticket.UserId);
        if (user == null)
        {
            return NotFound("User not found");
        }
        
        var car = await carService.GetCarByIdAsync(ticket.CarId);
        if (car == null)
        {
            return NotFound("Car not found");
        }
        
        GeneralDto generalDto = new GeneralDto()
        {
            Name = user.Name,
            Surname = user.Surname,
            Address = user.Address,
            FIN = user.FIN,
            PhoneNumber = user.PhoneNumber,
            Email = user.Email,
            BirthDate = user.BirthDate,
            VIN = car.VIN,
            RegistrationPlate = car.RegistrationPlate,
            RegistrationCertificate = car.RegistrationCertificate,
            Color = car.Color,
            YearOfManufacture = car.YearOfManufacture,
            Make = car.Make,
            Model = car.Model,
            Type = car.Type,
            IssueDate = ticket.IssueDate,
            ExpirationDate = ticket.ExpirationDate,
            Status = ticket.Status
        };
        
        return Ok(generalDto);
    }
    
    [Authorize(Roles = "USER")]
    [HttpGet("{userId}/get-tickets")]
    public async Task<IActionResult> GetTickets(Guid userId)
    {
        var tickets = await ticketService.GetTicketsAsync(userId);
        return Ok(new { ticketsData = tickets });
    }

    [Authorize(Roles = "USER")]
    [HttpGet("{userId}/get-active-tickets")]
    public async Task<IActionResult> GetActiveTickets(Guid userId)
    {
        var tickets = await ticketService.GetActiveTicketsAsync(userId);
        return Ok(new { ticketsData = tickets });
    }

    [Authorize(Roles = "USER")]
    [HttpGet("{userId}/get-expired-tickets")]
    public async Task<IActionResult> GetExpiredTickets(Guid userId)
    {
        var tickets = await ticketService.GetExpiredTicketsAsync(userId);
        return Ok(new { ticketsData = tickets });
    }

    [Authorize(Roles = "USER")]
    [HttpGet("{userId}/get-canceled-tickets")]
    public async Task<IActionResult> GetCanceledTickets(Guid userId)
    {
        var tickets = await ticketService.GetCanceledTicketsAsync(userId);
        return Ok(new { ticketsData = tickets });
    }

    [Authorize(Roles = "USER")]
    [HttpGet("{id}/get-ticket")]
    public async Task<IActionResult> GetTicket(Guid id)
    {
        var ticket = await ticketService.GetTicketByIdAsync(id);
        return Ok(new { ticketData = ticket });
    }

    [Authorize(Roles = "USER")]
    [HttpGet("{carId}/get-ticket-by-car")]
    public async Task<IActionResult> GetTicketByCar(Guid carId)
    {
        var ticket = await ticketService.GetTicketByCarIdAsync(carId);
        return Ok(new { ticketData = ticket });
    }

    [Authorize(Roles = "USER")]
    [HttpGet("{userId}/get-ticket-by-user")]
    public async Task<IActionResult> GetTicketByUser(Guid userId)
    {
        var ticket = await ticketService.GetTicketByUserIdAsync(userId);
        return Ok(new { ticketData = ticket });
    }

    [Authorize(Roles = "USER")]
    [HttpPost("create-ticket")]
    public async Task<IActionResult> CreateTicket([FromBody] TicketDto ticket)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        Ticket mapTicket = mapper.Map<Ticket>(ticket);

        var newTicket = await ticketService.CreateTicketAsync(mapTicket);
        return Ok(new { ticketData = newTicket });
    }
    
    [Authorize(Roles = "USER")]
    [HttpPost("cancel-ticket/{ticketId}")]
    public async Task<IActionResult> CancelTicket(Guid ticketId)
    {
        var ticket = await ticketService.CancelTicketAsync(ticketId);
        return Ok(new { ticketData = ticket });
    }
    
    [Authorize(Roles = "USER")]
    [HttpPut("update-ticket")]
    public async Task<IActionResult> UpdateTicket([FromBody] TicketDto ticket)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        ticket.IssueDate = ticket.IssueDate.ToUniversalTime();
        ticket.ExpirationDate = ticket.ExpirationDate.ToUniversalTime();
        
        var updatedTicket = await ticketService.UpdateTicketAsync(ticket);
        return Ok(new { ticketData = updatedTicket });
    }
    
    [Authorize(Roles = "USER")]
    [HttpDelete("{id}/delete-ticket")]
    public async Task<IActionResult> DeleteTicket(Guid id)
    {
        var ticket = await ticketService.DeleteTicketAsync(id);
        return Ok(new { ticketData = ticket });
    }
}