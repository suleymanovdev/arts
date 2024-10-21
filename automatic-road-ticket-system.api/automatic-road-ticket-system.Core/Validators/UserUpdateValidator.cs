using automatic_road_ticket_system.Core.DTOs;
using FluentValidation;

namespace automatic_road_ticket_system.Core.Validators;

public class UserUpdateValidator : AbstractValidator<UserDto>
{
    public UserUpdateValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Surname).NotEmpty();
        RuleFor(x => x.Address).NotEmpty();
        RuleFor(x => x.FIN).NotEmpty();
        RuleFor(x => x.PhoneNumber).NotEmpty();
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.BirthDate).NotEmpty();
    }
}