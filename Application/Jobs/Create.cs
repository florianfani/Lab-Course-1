using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Jobs
{
    public class Create
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
        private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
            this.userAccessor = userAccessor;
            this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await this.context.Users.FirstOrDefaultAsync(x => 
                    x.UserName == this.userAccessor.GetUsername());

                var attendee = new JobAttendee{
                    AppUser = user,
                    Job = request.Job,
                    IsPost = true
                };

                request.Job.Attendees.Add(attendee);    

                this.context.Jobs.Add(request.Job);

                var result = await this.context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create job");

                return Result<Unit>.Success(Unit.Value);
            }
        }


    }
}