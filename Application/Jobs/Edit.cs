using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Jobs
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>{
            public Job Job { get; set; }
        }

                public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Job).SetValidator(new JobValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext context;
        private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
            this.mapper = mapper;
            this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var job = await this.context.Jobs.FindAsync(request.Job.Id);

                if(job == null) return null;

                this.mapper.Map(request.Job, job);

                var result = await this.context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update job");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}