using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using EmaaWebApi.Models.DBContexts;
using System.IO;
using Microsoft.Extensions.FileProviders;
using DevExpress.AspNetCore;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http;

namespace EmaaWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        private readonly string _policyName = "CorsPolicy";


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {


            services.AddControllers();
            services.AddCors(options =>
            {
                options.AddPolicy(_policyName, policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            });

            //services.AddCors(opt =>
            //{
            //    opt.AddPolicy(name: _policyName, builder =>
            //    {
            //        builder
            //        .WithOrigins("http://127.0.0.1:3000",
            //            "http://localhost:8080",
            //            "http://193.95.69.51:9001" ).AllowAnyMethod();
            //    });
            //});
            //            services.AddCors(opt =>
            //            {
            //                opt.AddPolicy(name: _policyName, builder =>
            //                {
            //                    builder
            //.AllowAnyOrigin()
            //                        .AllowAnyHeader()
            //                        .AllowAnyMethod()
            //                        ;
            //                });
            //            });



            // adding the MultiPartBodyLength Configuration
            services.Configure<FormOptions>(options =>
            {
                // the max length of individual form values 
                options.ValueLengthLimit = int.MaxValue;
                // length of the each multipart body
                options.MultipartBodyLengthLimit = int.MaxValue;
                // this is used for buddering the form body into the memory
                options.MemoryBufferThreshold = int.MaxValue;
            });
            // ends here


            string mySqlConnectionStr = Configuration.GetConnectionString("PhoneConStr");

            services.AddDbContextPool<MyDBContext>(options =>
            options.UseMySql(mySqlConnectionStr, ServerVersion.AutoDetect(mySqlConnectionStr)));

            services.AddControllers();
            services.AddMvc();
            services.AddDevExpressControls();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "My Awesome API",
                    Version = "v1"
                });

               
                

                c.DocInclusionPredicate((docName, apiDesc) =>
                {
                    // Filter out 3rd party controllers
                    var assemblyName = ((ControllerActionDescriptor)apiDesc.ActionDescriptor).ControllerTypeInfo.Assembly.GetName().Name;
                    var currentAssemblyName = GetType().Assembly.GetName().Name;
                    return currentAssemblyName == assemblyName;
                });

            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My Awesome API V1");
                });
            }


            app.UseStaticFiles(new StaticFileOptions
            {
               // FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images")),
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Images")),
                RequestPath = "/Images"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
               FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "node_modules")),
              //  FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "node_modules")),
                RequestPath = "/node_modules"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
              //  FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "UploadedFiles")),
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles")),
                RequestPath = "/UploadedFiles"
            });

  //          app.UseStaticFiles(new StaticFileOptions()
  //          {
  //              FileProvider = new PhysicalFileProvider
  //(Path.Combine(Directory.GetCurrentDirectory(), @"UploadedFiles")),
  //              RequestPath = new PathString("/UploadedFiles")
  //          });

            app.UseHttpsRedirection();
            app.UseDeveloperExceptionPage();
            app.UseRouting();

             app.UseCors(_policyName);
            // global cors policy

            app.UseDevExpressControls();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
