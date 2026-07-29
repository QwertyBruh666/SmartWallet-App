using Application.CustomExceptions.Base;

namespace Domain.CustomExceptions
{
    public class AuthException(int statusCode, string code, string message) : AppException(statusCode, code, message) {}
}