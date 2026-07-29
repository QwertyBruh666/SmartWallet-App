using Application.CustomExceptions.Base;

namespace Domain.CustomExceptions
{
    public class UserException(int statusCode, string code, string message) : AppException(statusCode, code, message) {}
}