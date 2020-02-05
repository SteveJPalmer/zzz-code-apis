using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HermesNG.Models;
using Microsoft.Azure.Documents;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace AzFunctions
{
    public static class OnFSUsChanged
    {
        [FunctionName("OnFSUsChanged")]
        public static async Task Run(
            [CosmosDBTrigger("%SITAStatusDatabaseName%", "%SITAStatusCollectionName%", ConnectionStringSetting = "CosmosDBConnection",
                    LeaseCollectionName = "%LeaseCollectionName%",
                    CreateLeaseCollectionIfNotExists = true)]
            IEnumerable<object> updatedFSUs,
            [SignalR(HubName = "fsu")] IAsyncCollector<SignalRMessage> signalRMessages,
            ILogger log)
            {
                await signalRMessages.AddAsync(new SignalRMessage
                {
                    Target = "awbStatusUpdated",
                    Arguments = updatedFSUs.ToArray()
                });
            }
    }
}
