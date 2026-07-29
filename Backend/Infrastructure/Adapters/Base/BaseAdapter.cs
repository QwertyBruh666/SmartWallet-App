using Application.Adapters;

namespace Infrastructure.Adapters.Base;

public class BaseAdapter<T>
{
    protected T client;
    protected void ConfigureClient(Func<T> function)
    {
        client = function();
    }
}