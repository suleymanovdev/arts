using AutoMapper;
using automatic_road_ticket_system.Core.DTOs;
using automatic_road_ticket_system.Core.Entities;
using automatic_road_ticket_system.Core.Interfaces;
using automatic_road_ticket_system.Infrastructure.Services.ENCRIPTION;

namespace automatic_road_ticket_system.Infrastructure.Services;

public class UserService
{
    private readonly IMapper _mapper;
    private readonly IUserRepository _userRepository;
    private readonly DataEncriptionService _dataEncriptionService;

    public UserService(IMapper mapper, IUserRepository userRepository, DataEncriptionService dataEncriptionService)
    {
        _mapper = mapper;
        _userRepository = userRepository;
        _dataEncriptionService = dataEncriptionService;
    }
    
    public async Task<User?> GetUserById(Guid id)
    {
        return await _userRepository.GetUserByIdAsync(id);
    }

    public async Task<User?> Register(SignupDto signupDto)
    {
        var existingUser = await _userRepository.GetUserByEmailAsync(signupDto.Email);
        if (existingUser != null)
        {
            return existingUser;
        }

        User user = _mapper.Map<User>(signupDto);
        user.Password = _dataEncriptionService.HashPassword(signupDto.Password);
        user.SetRegistrationDate(DateTime.UtcNow);
        await _userRepository.AddUserAsync(user);
        return user;
    }

    public async Task<bool> Verify(string email)
    {
        return await _userRepository.VerifyRegisterOtp(email);
    }

    public async Task<User?> Login(LoginDto loginDto)
    {
        var existingUser = await _userRepository.GetUserByEmailAsync(loginDto.Email);
        if (existingUser == null)
        {
            return null;
        }

        if (!_dataEncriptionService.VerifyPassword(loginDto.Password, existingUser.Password))
        {
            return null;
        }
        
        if (!existingUser.IsVerified)
        {
            return null;
        }

        return existingUser;
    }
    
    public async Task<User> GetUserId(string email)
    {
        return await _userRepository.GetUserByEmailAsync(email);
    }

    public async Task<UserDto?> GetUserByEmail(string email)
    {
        var user = await _userRepository.GetUserByEmailAsync(email);
        if (user == null)
        {
            return null;
        }

        return _mapper.Map<UserDto>(user);
    }
    
    public async Task<UserDto?> UpdateUser(string email, UserDto userDto)
    {
        var user = await _userRepository.GetUserByEmailAsync(email);
        if (user == null)
        {
            return null;
        }

        user = _mapper.Map(userDto, user);
        await _userRepository.UpdateUserAsync(user);
        return _mapper.Map<UserDto>(user);
    }
}