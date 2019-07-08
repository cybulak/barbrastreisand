namespace BarbraStreisand.Api
{
    using System;
    using System.IO;
    using Microsoft.Extensions.Configuration;

    internal static class ConfigurationManager
    {
        static ConfigurationManager()
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            AppSetting = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile($"appsettings.{environment}.json", false, true)
                .Build();
        }

        public static IConfiguration AppSetting { get; }
    }
}