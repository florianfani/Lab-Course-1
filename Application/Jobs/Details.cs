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
    public class Details
    {
        public class Query : IRequest<Result<JobDto>>{

            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<JobDto>>
        {
        private readonly DataContext context;
        private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
            this.mapper = mapper;
            this.context = context;
            }

            public async Task<Result<JobDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var job = await this.context.Jobs
                    .ProjectTo<JobDto>(this.mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<JobDto>.Success(job);
            }
        }

    }
}