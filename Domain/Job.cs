using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Job
    {
        public Guid Id { get; set; }

      //  [Required]

        public string Title { get; set; }

        public DateTime Date {get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string City { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<JobAttendee> Attendees { get; set; } = new List<JobAttendee>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();

    }
}