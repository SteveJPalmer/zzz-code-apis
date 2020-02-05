using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

using Newtonsoft.Json;

namespace WebAPI101.Controllers
{
  [Route("api/[controller]")]
  public class OrdersNewController : Controller
  {
    public class Order
    {
      public int OrderNo { get; set; }
      public int PatientId { get; set; }
      public string Clinician { get; set; }
      public string Source { get; set; }
      public string RequestedDate { get; set; }
      public string ReceivedDate { get; set; }
    }


    /* rework order controller from JsonResult to IActionResult */
    /// <summary>
    /// Get Order based on unique identifier
    /// </summary>
    ///  <remarks>
    /// Sample request:
    ///
    ///     GET /ordernew
    ///     {
    ///        "id": 1  
    ///     }
    /// </remarks>
    /// <param name="id">Unique identifier</param>
    /// <returns>A single order or null</returns>
    /// <response code="200">OK - Returns order for given id</response>
    /// <response code="404">NotFound - If no matching order found</response> 
    /// <response code="403">Forbidden - If forbidden</response>
    [HttpGet("{id}")]
    [EnableCors("myCORSPolicy")]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [ProducesResponseType((int)HttpStatusCode.Forbidden)]
    public IActionResult Get(string id)
    {

      if (id == "888")
      {
        return NotFound();
      }

      if (id == "999")
      {
        return Forbid();
      }

      Order myorder = new Order
      {
        OrderNo = int.Parse(id),
        //OrderNo =  System.Convert.ToInt32(id),
        PatientId = 21,
        Clinician = "test clinician 1",
        Source = "test source 1",
        RequestedDate = "2017-10-01",
        ReceivedDate = "2017-10-01"
      };

      return Ok(myorder);
    }

  }
}
