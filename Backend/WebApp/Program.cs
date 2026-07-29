using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using WebApp.Middlewares;
using Application.Services.Realization;
using Application.Services.Interfaces;
using Infrastructure.Database.DbConnectionInfo;
using Infrastructure.Cache;
using Microsoft.Extensions.Caching.StackExchangeRedis;
using Application.Providers;
using Application.Factories;
using Infrastructure.Providers;
using Infrastructure.Factories;
using Application.DataBase;
using Infrastructure.Options;
using Infrastructure.Services;
using Application.Options;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();

builder.Services.AddAuthentication("Bearer").AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = "Kolobok&CO",
        ValidateAudience = true,
        ValidAudience = "Papich",
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mySuperPuperVerySecureFuckingKey")),
        ClockSkew = TimeSpan.Zero
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived =
    context =>
    {
        try
        {
            var Cookies = context.Request.Cookies;
            string token = Cookies["accessToken"];
            context.Token = token;
        }
        catch (Exception exp)
        {
            Console.WriteLine(exp.Message);
            Console.WriteLine("Ошибка во время входа в Authorize метод");
        }
        return Task.CompletedTask;
    }
    };
});


builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost5500", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500")
              .AllowAnyHeader()
              .AllowAnyMethod();
        policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        policy.WithOrigins("http://192.168.0.54:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        policy.WithOrigins("http://172.20.10.3:3000").AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddHttpClient();

//Options
builder.Services.Configure<AppOptions>(builder.Configuration.GetSection("APP"));
builder.Services.Configure<OAuthOptions>(builder.Configuration.GetSection("GOOGLE_AUTH"));
builder.Services.Configure<NewsOptions>(builder.Configuration.GetSection("NEWSAPI"));
builder.Services.Configure<CoinMarketOptions>(builder.Configuration.GetSection("COINMARKETAPI"));
builder.Services.Configure<AuthOptions>(builder.Configuration.GetSection("AUTH"));

//Db options
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySql(builder.Configuration["DB_CONNECTION_DOCKER"], new MySqlServerVersion(new Version("9.0.1")), opt => opt.EnableRetryOnFailure()));
builder.Services.AddScoped<IAppDbContext>(provider => provider.GetRequiredService<AppDbContext>());

//Redis cache options 
builder.Services.AddStackExchangeRedisCache(opt => { opt.Configuration = "cache:6379"; });

//Providers
builder.Services.AddScoped<ICoinFileProvider, CoinFileProvider>();
builder.Services.AddScoped<ICoinChartProvider, CoinChartProvider>();
builder.Services.AddScoped<ICoinMarketDataProvider, CoinMarketDataProvider>();
builder.Services.AddScoped<INewsProvider, NewsProvider>();
builder.Services.AddSingleton<IEncryptionService, EncryptionService>();

//Factories
builder.Services.AddScoped<IExchangeAdapterFactory, ExchangeAdapterFactory>();

//Application services
builder.Services.AddScoped<ICryptoMarketService, CryptoMarketService>();
builder.Services.AddScoped<ITokensService, TokensService>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<IWalletsService, WalletsService>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<ICacheService, CacheService>();
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();
//app.UseHttpsRedirection();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseGetUserID();
app.UseErrorHandling();
app.UseRouting();
app.MapControllers();
app.UseCors("AllowLocalhost5500");
app.UseAuthentication();
app.UseAuthorization();

app.Run();


