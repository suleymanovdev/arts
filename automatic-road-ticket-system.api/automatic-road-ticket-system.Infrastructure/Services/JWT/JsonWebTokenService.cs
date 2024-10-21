using automatic_road_ticket_system.Core.Enums;
using automatic_road_ticket_system.Core.Interfaces.JWT;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace automatic_road_ticket_system.Infrastructure.Services.JWT;

public class JsonWebTokenService : IJsonWebTokenRepository
{
    public string GenerateJwtToken(string email, Role role)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWTSettings__Key")));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.Role, role.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: Environment.GetEnvironmentVariable("JWTSettings__Issuer"),
            audience: Environment.GetEnvironmentVariable("JWTSettings__Audience"),
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(Environment.GetEnvironmentVariable("JWTSettings__DurationInMinutes"))),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}