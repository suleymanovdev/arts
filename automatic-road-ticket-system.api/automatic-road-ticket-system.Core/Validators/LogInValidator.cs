using automatic_road_ticket_system.Core.DTOs;
using FluentValidation;

namespace automatic_road_ticket_system.Core.Validators;

public class LoginValidator : AbstractValidator<LoginDto>
{
    public LoginValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
    }
}