using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class JobsController : BaseApiController
    {
        private readonly DataContext context;
        
        public JobsController(DataContext context){
            this.context = context;

        }

        [HttpGet]

        public async Task<ActionResult<List<Job>>> GetJobs(){
            return await this.context.Jobs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetJob(Guid id){
            return await this.context.Jobs.FindAsync(id);
        } 

    }
}