using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

using Newtonsoft.Json;

namespace WebAPI101.Controllers
{

    [Route("api/[controller]")]
    public class OrdersController : Controller {


        public class Order
        {
          public int OrderNo { get; set; }
          public int PatientId { get; set; }
          public string Clinician { get; set; }
          public string Source { get; set; }
          public string RequestedDate { get; set; }
          public string ReceivedDate { get; set; }

        }


        // GET api/orders
        [HttpGet]
        [EnableCors("myCORSPolicy")]
        public JsonResult Get()
        {
          /* option 1  - only issue is get excape characters in Javascritp f/e 
          *             can use js  JSON.parse to string them out on retrieval
          */
          //String resp = " { \"orderNo\": \"1002\", " +
          //              "   \"patientId\" : \"702\" " +
          //              "   \"clinician\" : \"test clinician 2\" " +
          //              "   \"source\" : \"test source 2\" " +
          //              "   \"requestedDate\" : \"2017-02-18\" " +
          //              "   \"receivedDate\" : \"2017-02-18\" ";


          //or with verbatim string literal
          String resp = @" { ""orderNo"": ""1002"", 
                          ""patientId"" : ""702"", 
                          ""clinician"" : ""test clinician 2"", 
                          ""source"" : ""test source 2"", 
                          ""requestedDate"" : ""2017-02-18"", 
                          ""receivedDate"" : ""2017-02-18"" } ";

            JsonSerializer ser = new JsonSerializer();
            String jsonobj = JsonConvert.SerializeObject(resp);

            /* option 2  - use a class instance to create the object to be serialised 
            *             
            */
            Order myorder1 = new Order
            {
              OrderNo = 1,
              PatientId = 21,
              Clinician = "test clinician 1",
              Source = "test source 1",
              RequestedDate = "2017-10-01",
              ReceivedDate = "2017-10-01"
            };
            Order myorder2 = new Order
            {
              OrderNo = 2,
              PatientId = 22,
              Clinician = "test clinician 2",
              Source = "test source 2",
              RequestedDate = "2017-10-02",
              ReceivedDate = "2017-10-02"
            };

            List<Order> orders = new List<Order>();
            orders.Add(myorder1);
            orders.Add(myorder2);

            return Json(orders);
        }


        // GET api/orders/5
        [HttpGet("{id}")]
        [EnableCors("myCORSPolicy")]
        public JsonResult Get(int id)
        {

          Order myorder = new Order
          {
            OrderNo = 1,
            PatientId = 21,
            Clinician = "test clinician 1",
            Source = "test source 1",
            RequestedDate = "2017-10-01",
            ReceivedDate = "2017-10-01"
          };

          return Json(myorder);
        }


        // POST api/orders
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/orders/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/orders/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
