using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Core;
using Application.Jobs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class JobsController : BaseApiController
    {
        

        [HttpGet]

        public async Task<IActionResult> GetJobs([FromQuery]JobParams param){
            return HandlePagedResult(await this.Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetJob(Guid id){
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));        
        } 


        [HttpPost]
        public async Task<IActionResult> CreateJob(Job job){
            return HandleResult(await Mediator.Send(new Create.Command {Job = job}));
        }

        [Authorize(Policy = "IsJobPost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditJob(Guid id, Job job){
            
            job.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Job = job}));
        }

        [Authorize(Policy = "IsJobPost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/attend")]

        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }

    }
}