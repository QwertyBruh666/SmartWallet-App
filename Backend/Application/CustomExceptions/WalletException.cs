using Application.CustomExceptions.Base;

namespace Application.CustomExceptions
{
    public class WalletException(int statusCode, string code, string message) : AppException(statusCode, code, message) {}
}