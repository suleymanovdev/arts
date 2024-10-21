using automatic_road_ticket_system.Core.DTOs;
using automatic_road_ticket_system.Core.Enums;
using automatic_road_ticket_system.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace automatic_road_ticket_system.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CarController(UserService userService, CarService carService) : Controller
{
    [Authorize(Roles = "USER")]
    [HttpGet("{email}/get-car-id/{vin}")]
    public async Task<IActionResult> GetCarId(string email, string vin)
    {
        var car = await carService.GetCarByVinAsync(vin);
        if (car == null)
        {
            return BadRequest("Car not found");
        }

        return Ok( new { carId = car.Id } );
    }
    
    [Authorize(Roles = "USER")]
    [HttpGet("{email}/get-cars")]
    public async Task<IActionResult> GetCars(string email)
    {
        var user = await userService.GetUserByEmail(email);
        if (user == null)
        {
            return BadRequest("User not found");
        }

        var cars = await carService.GetAllCarsAsync();
        return Ok( new { carsData = cars } );
    }
    
    [Authorize(Roles = "USER")]
    [HttpGet("{email}/get-car/{vin}")]
    public async Task<IActionResult> GetCar(string email, string vin)
    {
        var car = await carService.GetCarByVinAsync(vin);
        if (car == null)
        {
            return BadRequest("Car not found");
        }

        return Ok( new { carData = car } );
    }
    
    [Authorize(Roles = "USER")]
    [HttpPost("{email}/add-car")]
    public async Task<IActionResult> AddCar(string email, [FromBody] CarDto car)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var existingCar = await carService.GetCarByVinAsync(car.VIN);
        
        if (existingCar != null)
        {
            return BadRequest("Car already exists");
        }
        
        car.YearOfManufacture = DateTime.SpecifyKind(car.YearOfManufacture, DateTimeKind.Utc);
        
        var addedCar = await carService.AddCarAsync(email, car);
        if (addedCar == null)
        {
            return BadRequest("User not found");
        }

        return Ok( new { carData = addedCar } );
    }
    
    [Authorize(Roles = "USER")]
    [HttpPut("{email}/update-car/{vin}")]
    public async Task<IActionResult> UpdateCar(string email, string vin, [FromBody] CarDto car)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        car.YearOfManufacture = DateTime.SpecifyKind(car.YearOfManufacture, DateTimeKind.Utc);
        
        var updatedCar = await carService.UpdateCarAsync(email, vin, car);
        if (updatedCar == null)
        {
            return BadRequest("User or Car not found");
        }

        return Ok( new { carData = updatedCar } );
    }
    
    [Authorize(Roles = "USER")]
    [HttpDelete("{email}/delete-car/{vin}")]
    public async Task<IActionResult> DeleteCar(string email, string vin)
    {
        var car = await carService.GetCarByVinAsync(vin);
        if (car == null)
        {
            return BadRequest("Car not found");
        }
        
        await carService.DeleteCarAsync(car.Id);
        return Ok("Car deleted successfully");
    }
}