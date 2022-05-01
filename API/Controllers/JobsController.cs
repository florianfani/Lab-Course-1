using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Jobs;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class JobsController : BaseApiController
    {
        

        [HttpGet]

        public async Task<ActionResult<List<Job>>> GetJobs(){
            return await this.Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetJob(Guid id){
            return await Mediator.Send(new Details.Query{Id = id});
        } 


        [HttpPost]
        public async Task<IActionResult> CreateJob(Job job){
            return Ok(await Mediator.Send(new Create.Command {Job = job}));
        }

    }
}