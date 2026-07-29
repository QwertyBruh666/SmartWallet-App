namespace Application.Services.Interfaces
{
    public interface ICacheService
    {
        Task<T> CachedInfo<T>(string cacheName, Func<Task<T>> getInfoFunc, double? expireTime = null);
    }
}