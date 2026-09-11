using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace LifeSpot
{
    /// <summary>
    /// Статический класс для маппинга маршрутов (эндпоинтов) приложения
    /// </summary>
    public static class EndpointMapper
    {
        /// <summary>
        /// Главный метод-расширение, подключающий все эндпоинты
        /// </summary>
        public static void MapLifeSpotEndpoints(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapHtml();
            endpoints.MapCss();
            endpoints.MapJs();
            endpoints.MapImages();
        }

        /// <summary>
        /// Маппинг HTML страниц
        /// </summary>
        public static void MapHtml(this IEndpointRouteBuilder endpoints)
        {
            // Главная страница
            endpoints.MapGet("/", async context =>
            {
                var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "index.html");
                var page = await File.ReadAllTextAsync(viewPath);
                await context.Response.WriteAsync(page);
            });

            // Страница "О проекте"
            endpoints.MapGet("/about", async context =>
            {
                var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "about.html");
                var page = await File.ReadAllTextAsync(viewPath);
                await context.Response.WriteAsync(page);
            });
        }

        /// <summary>
        /// Маппинг файлов CSS стилей
        /// </summary>
        public static void MapCss(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapGet("/Static/CSS/index.css", async context =>
            {
                var cssPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "CSS", "index.css");
                var css = await File.ReadAllTextAsync(cssPath);
                await context.Response.WriteAsync(css);
            });
        }

        /// <summary>
        /// Маппинг файлов JavaScript
        /// </summary>
        public static void MapJs(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapGet("/Static/JS/about.js", async context =>
            {
                var jsPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "JS", "about.js");
                var js = await File.ReadAllTextAsync(jsPath);
                await context.Response.WriteAsync(js);
            });
        }

        /// <summary>
        /// Маппинг изображений для слайдера
        /// </summary>
        public static void MapImages(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapGet("/Static/Images/{fileName}", async context =>
            {
                var fileName = context.Request.RouteValues["fileName"]?.ToString();
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "Images", fileName ?? "");

                if (File.Exists(imagePath))
                {
                    await context.Response.SendFileAsync(imagePath);
                }
                else
                {
                    context.Response.StatusCode = 404;
                }
            });
        }
    }
}