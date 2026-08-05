using Application.CustomExceptions.Base;

namespace Application.CustomExceptions
{
    public class UserException(int statusCode, string code, string message) : AppException(statusCode, code, message) {}
}