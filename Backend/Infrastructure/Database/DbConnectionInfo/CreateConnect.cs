using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Infrastructure.Database.DbConnectionInfo
{
    public class CreateConnect : IDesignTimeDbContextFactory<AppDbContext>
    {
        public CreateConnect()
        {
            Env.TraversePath().Load();
        }

        public AppDbContext CreateDbContext(string[] args)
        {
            DbContextOptionsBuilder<AppDbContext> optionsBuilder = new();
            optionsBuilder.UseMySql(Environment.GetEnvironmentVariable("DB_CONNECTION_EXTERNAL"), new MySqlServerVersion(new Version("9.0.1")), opt => opt.EnableRetryOnFailure());
            return new AppDbContext(optionsBuilder.Options);
        }
    }
}