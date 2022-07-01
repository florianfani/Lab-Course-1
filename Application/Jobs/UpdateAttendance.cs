using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var job = await this.context.Jobs
                    .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if(job == null) return null;

                var user = await this.context.Users.FirstOrDefaultAsync(x => 
                    x.UserName == this.userAccessor.GetUsername());  

                if(user == null) return null;

                var postUsername = job.Attendees.FirstOrDefault(x => x.IsPost)?.AppUser?.UserName; 

                var attendance = job.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if(attendance != null && postUsername == user.UserName)
                    job.IsCancelled = !job.IsCancelled;

                if(attendance != null && postUsername != user.UserName)    
                    job.Attendees.Remove(attendance);

                if(attendance == null)
                {
                    attendance = new JobAttendee
                    {
                        AppUser = user,
                        Job = job,
                        IsPost = false
                    };

                    job.Attendees.Add(attendance);
                }         

                var result = await this.context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");

            }
        }
    }
}