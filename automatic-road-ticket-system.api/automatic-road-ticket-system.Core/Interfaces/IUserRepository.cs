using automatic_road_ticket_system.Core.Entities;

namespace automatic_road_ticket_system.Core.Interfaces;

public interface IUserRepository
{
    Task<User> GetUserByIdAsync(Guid id);
    Task<User> GetUserByEmailAsync(string email);
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task AddUserAsync(User user);
    Task UpdateUserAsync(User user);
    Task DeleteUserAsync(Guid id);
    Task<bool> VerifyRegisterOtp(string email);
    Task<bool> AddCarToUserAsync(User user, Car car);
}