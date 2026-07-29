using System;
using System.IdentityModel.Tokens.Jwt;

namespace WebApp.Middlewares;

public class GetUserIdMiddleware(RequestDelegate next)
{
    public readonly RequestDelegate _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        var userIdCookie = context.Request.Cookies.FirstOrDefault(c => c.Key == "accessToken");
        if (userIdCookie.Key != null)
        {
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(userIdCookie.Value);
            string value = jwt.Claims.First(c => c.Type.EndsWith("/name")).Value;
            context.Items.Add("userId", int.Parse(value));
        }
        await _next(context);
    }
}
public static class GetUserIdMiddlewareExtentensions
{
    public static IApplicationBuilder UseGetUserID(this IApplicationBuilder builder1)
    {
        return builder1.UseMiddleware<GetUserIdMiddleware>();
    }
}