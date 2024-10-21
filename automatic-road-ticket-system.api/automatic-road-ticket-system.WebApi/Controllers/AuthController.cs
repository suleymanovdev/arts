using automatic_road_ticket_system.Core.DTOs;
using automatic_road_ticket_system.Infrastructure.Services;
using automatic_road_ticket_system.Infrastructure.Services.OTP;
using automatic_road_ticket_system.Infrastructure.Services.JWT;
using Microsoft.AspNetCore.Mvc;

namespace automatic_road_ticket_system.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(
    UserService userService,
    JsonWebTokenService jsonWebTokenService,
    RegistrationOneTimePasswordService registrationOneTimePasswordService)
    : ControllerBase
{
    /// <summary>
    /// Register a new user
    /// </summary>
    /// <param name="signupDto"></param>
    /// <returns></returns>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] SignupDto? signupDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (signupDto == null)
        {
            return BadRequest("Invalid client request");
        }
        else if (string.IsNullOrEmpty(signupDto.Email) || string.IsNullOrEmpty(signupDto.Password))
        {
            return BadRequest("Fields empty");
        }

        var user = await userService.Register(signupDto);

        if (user == null)
        {
            return BadRequest("User already exists");
        }

        await registrationOneTimePasswordService.Create(signupDto.Email);

        return Ok("User registered successfully");
    }

    /// <summary>
    /// Verify the OTP
    /// </summary>
    /// <param name="email"></param>
    /// <param name="otp"></param>
    /// <returns></returns>
    [HttpPost("{email}/verify/{otp}")]
    public async Task<IActionResult> Verify(string email, Guid otp)
    {
        bool otpRes = await registrationOneTimePasswordService.Verify(email, otp);
        bool res = await userService.Verify(email);

        if (!otpRes || !res)
        {
            return BadRequest("Failed to verify OTP");
        }

        return Ok("OTP verified successfully");
    }

    /// <summary>
    /// Login a user
    /// </summary>
    /// <param name="loginDto"></param>
    /// <returns></returns>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto? loginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (loginDto == null)
        {
            return BadRequest("Invalid client request");
        }
        else if (string.IsNullOrEmpty(loginDto.Email) || string.IsNullOrEmpty(loginDto.Password))
        {
            return BadRequest("Fields empty");
        }

        var user = await userService.Login(loginDto);

        if (user == null)
        {
            return BadRequest("Invalid credentials");
        }

        var token = jsonWebTokenService.GenerateJwtToken(user.Email, user.Role);

        return Ok( new { email = loginDto.Email, jwtToken = token } );
    }
}