using automatic_road_ticket_system.Core.DTOs;
using FluentValidation;

namespace automatic_road_ticket_system.Core.Validators;

public class AddCarValidator : AbstractValidator<CarDto>
{
    public AddCarValidator()
    {
        RuleFor(x => x.VIN).NotEmpty().Length(15);
        RuleFor(x => x.RegistrationPlate).NotEmpty().Length(7);
        RuleFor(x => x.RegistrationCertificate).NotEmpty();
        RuleFor(x => x.Color).NotEmpty();
        RuleFor(x => x.YearOfManufacture).NotEmpty();
        RuleFor(x => x.Make).NotEmpty();
        RuleFor(x => x.Model).NotEmpty();
    }
}