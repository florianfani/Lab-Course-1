using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Jobs
{
    public class Create
    {
        public class Command : IRequest{
            

            public Job Job { get; set; }
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
                this.context.Jobs.Add(request.Job);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }


    }
}