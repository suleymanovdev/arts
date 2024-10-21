using automatic_road_ticket_system.Core.DTOs;
using automatic_road_ticket_system.Core.Interfaces;
using automatic_road_ticket_system.Core.Interfaces.JWT;
using automatic_road_ticket_system.Core.Interfaces.MAIL;
using automatic_road_ticket_system.Core.Interfaces.OTP;
using automatic_road_ticket_system.Core.Validators;
using automatic_road_ticket_system.Infrastructure.Data;
using automatic_road_ticket_system.Infrastructure.Mappings;
using automatic_road_ticket_system.Infrastructure.Repositories;
using automatic_road_ticket_system.Infrastructure.Repositories.OTP;
using automatic_road_ticket_system.Infrastructure.Services;
using automatic_road_ticket_system.Infrastructure.Services.Background;
using automatic_road_ticket_system.Infrastructure.Services.ENCRIPTION;
using automatic_road_ticket_system.Infrastructure.Services.MAIL;
using automatic_road_ticket_system.Infrastructure.Services.OTP;
using DotNetEnv;
using FluentValidation;
using FluentValidation.AspNetCore;
using automatic_road_ticket_system.Infrastructure.Services.JWT;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text;

Env.Load();

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console()
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Automatic Road Ticket System",
        Version = "v1",
        Description = "ARTS API",
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer {token}'",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

builder.Services.AddDbContext<DBContext>(options =>
{
    options.UseNpgsql(Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection"));
});

builder.Services.AddMemoryCache();

builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddScoped<ICarRepository, CarRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITicketRepository, TicketRepository>();
builder.Services.AddScoped<IRegistrationOneTimePasswordRepository, RegistrationOneTimePasswordRepository>();
builder.Services.AddScoped<IJsonWebTokenRepository, JsonWebTokenService>();
builder.Services.AddScoped<IMailService, MailService>();
builder.Services.AddScoped<IValidator<SignupDto>, SignupValidator>();
builder.Services.AddScoped<IValidator<LoginDto>, LoginValidator>();
builder.Services.AddScoped<IValidator<UserDto> , UserUpdateValidator>();
builder.Services.AddScoped<IValidator<CarDto> , AddCarValidator>();

builder.Services.AddScoped<CarService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<TicketService>();
builder.Services.AddScoped<RegistrationOneTimePasswordService>();
builder.Services.AddScoped<JsonWebTokenService>();
builder.Services.AddScoped<MailService>();
builder.Services.AddScoped<DataEncriptionService>();

builder.Services.AddHostedService<VerificationTimeoutService>();
builder.Services.AddHostedService<TicketExpirationService>();

builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWTSettings__Key"))),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.WithOrigins(
                "http://localhost:3000"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseStaticFiles();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ARTS API V1");
        c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.List);
        c.OAuthClientId("swaggerui");
        c.OAuthAppName("Swagger UI");
        c.InjectStylesheet("/SwaggerSettings/logo.css");
    });
}

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
