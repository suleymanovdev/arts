using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Text;

namespace automatic_road_ticket_system.Infrastructure.Services.ENCRIPTION;

public class DataEncriptionService
{
    public string HashPassword(string password)
    {
        byte[] salt = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("Authentication__Salt"));
        return Convert.ToBase64String(KeyDerivation.Pbkdf2(password, salt, KeyDerivationPrf.HMACSHA1, 10000, 256 / 8));
    }

    public bool VerifyPassword(string password, string hashedPassword)
    {
        return HashPassword(password) == hashedPassword;
    }
}