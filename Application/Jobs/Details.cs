using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Jobs
{
    public class Details
    {
        public class Query : IRequest<Result<Job>>{

            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<Job>>
        {
        private readonly DataContext context;
            public Handler(DataContext context)
            {
            this.context = context;
            }

            public async Task<Result<Job>> Handle(Query request, CancellationToken cancellationToken)
            {
                var job = await this.context.Jobs.FindAsync(request.Id);

                return Result<Job>.Success(job);
            }
        }

    }
}