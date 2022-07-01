using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs
{
    public class List
    {
        public class Query : IRequest<Result<List<JobDto>>> {}

        public class Handler : IRequestHandler<Query, Result<List<JobDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
            this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<List<JobDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var jobs = await context.Jobs
                .ProjectTo<JobDto>(this.mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<JobDto>>.Success(jobs);
            }
        }
    }
}