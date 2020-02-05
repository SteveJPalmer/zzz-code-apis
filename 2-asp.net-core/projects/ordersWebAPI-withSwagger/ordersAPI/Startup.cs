using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.Extensions.PlatformAbstractions;
using System.IO;

namespace WebAPI101
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // runtime method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            // Register Swagger generator in service collection - define Swagger documents
            services.AddSwaggerGen(c =>
            {
              c.SwaggerDoc("v1", 
                            new Info { Title = "My Order API",
                                       Version = "v1",
                                       Description = "A simple example ASP.NET Core Web API",
                                       TermsOfService = "None",
                                       Contact = new Contact { Name = "Steve Palmer", Email = "", Url = "http://AudioOrange.com" }
                            }
                           );

              // Set the comments path for the Swagger JSON & UI.
              var basePath = PlatformServices.Default.Application.ApplicationBasePath;
              var xmlPath = Path.Combine(basePath, "orders.xml");
              c.IncludeXmlComments(xmlPath);

            });

            // Add framework services.
            services.AddMvc();
 
            services.AddCors(options =>
            {
              options.AddPolicy("myCORSPolicy",
                //builder => builder.WithOrigins("http://localhost:63342"));   //Webstorm internal Http Server
                builder => builder.WithOrigins("http://localhost:3000"));      //lite-Server (development Http Server)
            });

        }

        // //runtime method to configure the HTTP request pipeline  
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // Enable middleware (add to pipeline) to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware (add to pipeline) to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
                  {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                  });

            app.UseMvc();
        }
    }
}
