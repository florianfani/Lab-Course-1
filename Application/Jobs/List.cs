using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs
{
    public class List
    {
        public class Query : IRequest<Result<List<Job>>> {}

        public class Handler : IRequestHandler<Query, Result<List<Job>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Job>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Job>>.Success(await context.Jobs.ToListAsync());
            }
        }
    }
}