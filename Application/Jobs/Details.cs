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
    public class Details
    {
        public class Query : IRequest<Job>{

            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Job>
        {
        private readonly DataContext context;
            public Handler(DataContext context)
            {
            this.context = context;
            }

            public async Task<Job> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Jobs.FindAsync(request.Id);
            }
        }

    }
}