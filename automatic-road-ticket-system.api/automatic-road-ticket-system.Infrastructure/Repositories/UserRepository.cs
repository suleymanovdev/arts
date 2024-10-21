using automatic_road_ticket_system.Core.Entities;
using automatic_road_ticket_system.Core.Interfaces;
using automatic_road_ticket_system.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace automatic_road_ticket_system.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly DBContext _context;

    public UserRepository(DBContext context)
    {
        _context = context;
    }

    public async Task<User> GetUserByIdAsync(Guid id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await Task.FromResult(_context.Users.ToList());
    }

    public async Task AddUserAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateUserAsync(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteUserAsync(Guid id)
    {
        var user = await GetUserByIdAsync(id);
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> VerifyRegisterOtp(string email)
    {
        var user = await GetUserByEmailAsync(email);
        
        if (user == null)
        {
            return false;
        }

        user.IsVerified = true;
        await UpdateUserAsync(user);

        return true;
    }
    
    public async Task<bool> AddCarToUserAsync(User user, Car car)
    {
        user.Cars.Add(car);
        await UpdateUserAsync(user);
        return true;
    }
}