using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
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
        public class Query : IRequest<Result<PagedList<JobDto>>> 
        {
            public JobParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<JobDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<PagedList<JobDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Jobs
                .Where(d => d.Date >= request.Params.StartDate)
                .OrderBy(d => d.Date)
                .ProjectTo<JobDto>(this.mapper.ConfigurationProvider, 
                    new {currentUsername = this.userAccessor.GetUsername()})
                .AsQueryable();

                if (request.Params.IsGoing && !request.Params.IsPost)
                {
                    query = query.Where(x => x.Attendees.Any(a => a.Username == userAccessor.GetUsername()));
                }

                if (request.Params.IsPost && !request.Params.IsGoing)
                {
                    query = query.Where(x => x.PostUsername == userAccessor.GetUsername());
                }

                return Result<PagedList<JobDto>>.Success(
                    await PagedList<JobDto>.CreateAsync(query, request.Params.PageNumber,
                        request.Params.PageSize)
                );
            }
        }
    }
}