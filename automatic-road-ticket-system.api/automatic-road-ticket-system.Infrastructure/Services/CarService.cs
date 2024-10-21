using AutoMapper;
using automatic_road_ticket_system.Core.DTOs;
using automatic_road_ticket_system.Core.Entities;
using automatic_road_ticket_system.Core.Interfaces;

namespace automatic_road_ticket_system.Infrastructure.Services;

public class CarService
{
    private readonly IUserRepository _userRepository;
    private readonly ICarRepository _carRepository;
    private readonly IMapper _mapper;

    public CarService(IUserRepository userRepository, ICarRepository carRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _carRepository = carRepository;
        _mapper = mapper;
    }
    
    public async Task<CarDto> GetCarByIdAsync(Guid id)
    {
        var car = await _carRepository.GetCarByIdAsync(id);
        return _mapper.Map<CarDto>(car);
    }
    
    public async Task<IEnumerable<CarDto>> GetAllCarsAsync()
    {
        var cars = await _carRepository.GetAllCarsAsync();
        return _mapper.Map<IEnumerable<CarDto>>(cars);
    }
    
    public async Task<CarDto> AddCarAsync(string email, CarDto carDto)
    {
        var user = await _userRepository.GetUserByEmailAsync(email);
        if (user == null)
        {
            return null;
        }
        
        var car = _mapper.Map<Car>(carDto);
        car.OwnerId = user.Id;
        await _carRepository.AddCarAsync(car);
        await _userRepository.AddCarToUserAsync(user, car);
        return _mapper.Map<CarDto>(car);
    }
    
    public async Task<CarDto> UpdateCarAsync(string email, string vin, CarDto carDto)
    {
        var user = await _userRepository.GetUserByEmailAsync(email);
        if (user == null)
        {
            return null;
        }
        
        var car = await _carRepository.GetCarByVinAsync(vin);
        if (car == null)
        {
            return null;
        }
        
        await _carRepository.UpdateCarAsync(car, carDto);
        
        return _mapper.Map<CarDto>(car);
    }
    
    public async Task DeleteCarAsync(Guid id)
    {
        await _carRepository.DeleteCarAsync(id);
    }

    public async Task<Car?> GetCarByVinAsync(string carVin)
    {
        return await _carRepository.GetCarByVinAsync(carVin);
    }
}