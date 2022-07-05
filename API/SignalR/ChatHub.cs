using System;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator mediator;
        public ChatHub(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await this.mediator.Send(command);

            await Clients.Group(command.JobId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var jobId = httpContext.Request.Query["jobId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, jobId);
            var result = await this.mediator.Send(new List.Query{JobId = Guid.Parse(jobId)});
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
} 