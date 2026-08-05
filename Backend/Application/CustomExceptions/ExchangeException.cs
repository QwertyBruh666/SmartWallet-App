using Application.CustomExceptions.Base;

namespace Application.CustomExceptions
{
    public class ExchangeException(int statusCode, string code, string message) : AppException(statusCode, code, message) {}
}