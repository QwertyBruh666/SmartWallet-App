using Microsoft.Extensions.Caching.Distributed;
using Application.Services.Interfaces;
using System.Text.Json;

namespace Infrastructure.Cache
{
    public partial class CacheService : ICacheService
    { 
        private async Task<string?> GetStringAsync(string key)
        {
            return await Cache.GetStringAsync(key);
        }
        private async Task SetStringAsync(string key, string value, double? fromMinutes = null)
        {
            if (fromMinutes != null)
            {
                DistributedCacheEntryOptions options = new DistributedCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes((double)fromMinutes));
                await Cache.SetStringAsync(key, value, options);
            }
            else
                await Cache.SetStringAsync(key, value, StandartOptions);
        }
    }
    public partial class CacheService(IDistributedCache cache) : ICacheService
    {
        private IDistributedCache Cache = cache;
        private static DistributedCacheEntryOptions StandartOptions = new DistributedCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(1));

        public async Task<T> CachedInfo<T>(string cacheName, Func<Task<T>> getInfoFunc, double? expireTime = null)
        {
            var data = await GetStringAsync(cacheName);
            if (data != null)
                return JsonSerializer.Deserialize<T>(data);
            T obj = await getInfoFunc();
            await SetStringAsync(cacheName, JsonSerializer.Serialize(obj), expireTime);
            return obj;
        }
    }
}