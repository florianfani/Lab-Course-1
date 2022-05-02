using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Jobs
{
    public class Edit
    {
        public class Command : IRequest{
            public Job Job { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext context;
        private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
            this.mapper = mapper;
            this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var job = await this.context.Jobs.FindAsync(request.Job.Id);

                this.mapper.Map(request.Job, job);

                await this.context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}