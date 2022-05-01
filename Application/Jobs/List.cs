using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs
{
    public class List
    {
        public class Query : IRequest<List<Job>> {}

        public class Handler : IRequestHandler<Query, List<Job>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<Job>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Jobs.ToListAsync();
            }
        }
    }
}