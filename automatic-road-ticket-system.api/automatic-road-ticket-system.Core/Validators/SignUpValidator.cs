using automatic_road_ticket_system.Core.DTOs;
using FluentValidation;

namespace automatic_road_ticket_system.Core.Validators;

public class SignupValidator : AbstractValidator<SignupDto>
{
    public SignupValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Surname).NotEmpty();
        RuleFor(x => x.Email).NotEmpty().EmailAddress();

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(6)
            .Matches(@"[!@#$%^&*()_+\-=[\]{}|\\:;'""<>,.?/~]")
            .WithMessage("Password must contain at least one special character");

        RuleFor(x => x.ConfirmPassword)
            .NotEmpty()
            .MinimumLength(6)
            .Equal(x => x.Password)
            .WithMessage("Confirm password must match password");
    }
}