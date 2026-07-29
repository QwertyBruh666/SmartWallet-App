namespace Application.CustomExceptions.Base;

public abstract class AppException(int statusCode, string code, string message) : Exception(message)
{
    public int StatusCode { get; init; } = statusCode;
    public string Code { get; init; } = code;
}