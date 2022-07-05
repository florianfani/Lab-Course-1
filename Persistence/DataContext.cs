using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobAttendee> JobAttendees { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<JobAttendee>(x => x.HasKey(aa => new {aa.AppUserId, aa.JobId}));

            builder.Entity<JobAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Jobs)
                .HasForeignKey(aa => aa.AppUserId);

             builder.Entity<JobAttendee>()
                .HasOne(u => u.Job)
                .WithMany(a => a.Attendees)
                .HasForeignKey(aa => aa.JobId);

            builder.Entity<Comment>()
                .HasOne(a => a.Job)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}