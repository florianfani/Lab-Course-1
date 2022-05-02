using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Jobs
{
    public class Delete
    {
        public class Command : IRequest{
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext context;
            public Handler(DataContext context)
            {
            this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var job = await this.context.Jobs.FindAsync(request.Id);

                this.context.Remove(job);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}