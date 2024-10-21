using AutoMapper;
using automatic_road_ticket_system.Core.DTOs;
using automatic_road_ticket_system.Core.Entities;

namespace automatic_road_ticket_system.Infrastructure.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Car, CarDto>();
        CreateMap<CarDto, Car>();
        CreateMap<User, UserDto>();
        CreateMap<UserDto, User>();
        CreateMap<SignupDto, User>();
        CreateMap<LoginDto, User>();
        CreateMap<Ticket, TicketDto>();
        CreateMap<TicketDto, Ticket>();
    }
}