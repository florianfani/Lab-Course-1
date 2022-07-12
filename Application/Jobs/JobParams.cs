using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Jobs
{
    public class JobParams : PagingParams
    {
        public bool IsGoing { get; set; }
        public bool IsPost { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}