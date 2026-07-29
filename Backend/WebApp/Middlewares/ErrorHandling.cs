using Application.CustomExceptions.Base;

namespace WebApp.Middlewares
{
    public class ErrorHandlingMiddleware(RequestDelegate next)
    {
        public readonly RequestDelegate _next = next;

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (AppException appExcep)
            {
                context.Response.StatusCode = appExcep.StatusCode;
                await context.Response.WriteAsJsonAsync(new { code = appExcep.Code, message = appExcep.Message });
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsJsonAsync(new
                {
                    code = "INTERNAL_ERROR",
                    message = ex.Message
                });
            }
        }
    }

    public static class ErrorHandlingMiddlewareExtensions
    {
        public static IApplicationBuilder UseErrorHandling(this IApplicationBuilder builder1)
        {
            return builder1.UseMiddleware<ErrorHandlingMiddleware>();
        }
    }
}