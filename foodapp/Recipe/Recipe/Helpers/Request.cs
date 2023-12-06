using Newtonsoft.Json;
using System.Net;
using System.Runtime;

namespace Recipe.Helpers
{
    public class Request
    {
        private readonly IConfiguration _config;
        public Request(IConfiguration config)
        {
            _config = config;
        }
        public async Task<T> ApiCallPost<T>(string controller,string method,object? obj)
        {
            var BaseUrl = _config.GetSection("FoodApiUrl").Value;
            try
            {
                using (WebClient webClient = new WebClient())
                {
                    webClient.Headers[HttpRequestHeader.ContentType] = "application/json";
                    
                    var response = await webClient.UploadStringTaskAsync(new Uri($"{BaseUrl}{controller}/{method}"), obj == null ? string.Empty : JsonConvert.SerializeObject(obj));
                    return JsonConvert.DeserializeObject<T>(response);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
