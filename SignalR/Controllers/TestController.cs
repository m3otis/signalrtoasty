using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR.Hubs;

namespace SignalR.Controllers
{
    public class TestController : Controller
    {
        private readonly IHubContext<ChatHub> hc;
        
        public TestController(IHubContext<ChatHub> hc) {
            this.hc = hc;
        }

        public IActionResult Index()
        {
            hc.Clients.All.SendAsync("messageReceived", "TEST1", "TEST2");
            return Ok("toasty");
        }
    }
}