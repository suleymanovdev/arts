using automatic_road_ticket_system.Core.DTOs;
using automatic_road_ticket_system.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace automatic_road_ticket_system.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController(UserService userService) : ControllerBase
{
    [Authorize(Roles = "USER")]
    [HttpGet("{email}/get-user-id")]
    public async Task<IActionResult> GetUserId(string email)
    {
        var user = await userService.GetUserId(email);
        if (user == null)
        {
            return NotFound("User not found");
        }

        return Ok( new { userId = user.Id } );
    }

    /// <summary>
    /// Get user data by email
    /// </summary>
    /// <param name="email"></param>
    /// <returns></returns>
    [Authorize(Roles = "USER")]
    [HttpGet("{email}/get-info")]
    public async Task<IActionResult> GetUserData(string email)
    {
        var user = await userService.GetUserByEmail(email);
        if (user == null)
        {
            return NotFound("User not found");
        }

        return Ok( new { userData = user } );
    }
    
    /// <summary>
    /// Update user data by email
    /// </summary>
    /// <param name="email"></param>
    /// <param name="user"></param>
    /// <returns></returns>
    [Authorize(Roles = "USER")]
    [HttpPut("{email}/update-info")]
    public async Task<IActionResult> UpdateUserData(string email, [FromBody] UserDto user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        user.BirthDate = user.BirthDate?.ToUniversalTime();
        
        var updatedUser = await userService.UpdateUser(email, user);
        if (updatedUser == null)
        {
            return NotFound("User not found");
        }

        return Ok( new { userData = updatedUser } );
    }
}