using automatic_road_ticket_system.Core.DTOs;
using automatic_road_ticket_system.Core.Entities;
using automatic_road_ticket_system.Core.Interfaces;
using automatic_road_ticket_system.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace automatic_road_ticket_system.Infrastructure.Repositories;

public class CarRepository : ICarRepository
{
    private readonly DBContext _context;

    public CarRepository(DBContext context)
    {
        _context = context;
    }

    public async Task<Car> GetCarByIdAsync(Guid id)
    {
        return await _context.Cars.FindAsync(id);
    }

    public async Task<IEnumerable<Car>> GetAllCarsAsync()
    {
        return await Task.FromResult(_context.Cars.ToList());
    }

    public async Task AddCarAsync(Car car)
    {
        await _context.Cars.AddAsync(car);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateCarAsync(Car car, CarDto carDto)
    {
        car.VIN = carDto.VIN;
        car.RegistrationPlate = carDto.RegistrationPlate;
        car.RegistrationCertificate = carDto.RegistrationCertificate;
        car.Color = carDto.Color;
        car.YearOfManufacture = carDto.YearOfManufacture;
        car.Make = carDto.Make;
        car.Model = carDto.Model;
        car.Type = carDto.Type;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteCarAsync(Guid id)
    {
        var car = await GetCarByIdAsync(id);
        if (car != null)
        {
            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
        }
    }
    
    public async Task<Car> GetCarByVinAsync(string vin)
    {
        return await _context.Cars.FirstOrDefaultAsync(c => c.VIN == vin);
    }
}