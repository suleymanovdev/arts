using automatic_road_ticket_system.Core.DTOs;
using automatic_road_ticket_system.Core.Entities;

namespace automatic_road_ticket_system.Core.Interfaces;

public interface ICarRepository
{
    Task<Car> GetCarByIdAsync(Guid id);
    Task<IEnumerable<Car>> GetAllCarsAsync();
    Task AddCarAsync(Car car);
    Task UpdateCarAsync(Car car, CarDto carDto);
    Task DeleteCarAsync(Guid id);
    Task<Car> GetCarByVinAsync(string vin);
}
