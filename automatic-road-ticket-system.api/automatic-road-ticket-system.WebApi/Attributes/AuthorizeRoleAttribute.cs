using automatic_road_ticket_system.Core.Enums;
using Microsoft.AspNetCore.Authorization;

namespace automatic_road_ticket_system.WebApi.Attributes;

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = true, AllowMultiple = true)]
public class AuthorizeRoleAttribute : AuthorizeAttribute
{
    public AuthorizeRoleAttribute(Role role) : base()
    {
        Roles = role.ToString();
    }
}