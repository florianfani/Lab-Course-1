using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class JobAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid JobId { get; set; }
        public Job Job { get; set; }
        public bool IsPost { get; set; }
    }
}