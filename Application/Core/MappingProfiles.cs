using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Jobs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Job, Job>();
            CreateMap<Job, JobDto>()
                .ForMember(d => d.PostUsername, o => o.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsPost).AppUser.UserName));
                CreateMap<JobAttendee, Profiles.Profile>()
                    .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))  
                    .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                    .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}