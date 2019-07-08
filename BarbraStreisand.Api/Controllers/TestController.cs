namespace BarbraStreisand.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;

    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TestController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new[] {"value1", "value2"};
        }

        [HttpGet("authorize")]
        [Authorize]
        public ActionResult<string> Authorize()
        {
            return new JsonResult(from c in User.Claims select new {c.Type, c.Value});
        }

        // POST api/values
        [HttpGet("info")]
        public ActionResult<string> Info()
        {
            return new JsonResult(new
            {
                Env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"),
                AppsettingsEnv = _configuration.GetValue<string>("AppsettingsEnv")
            });
        }
    }
}