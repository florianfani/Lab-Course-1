using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Jobs.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var jobs = new List<Job>
                {
                    new Job
                    {
                        Title = "Doktor",
                    	Description = "Trajtimi i problemeve dhe semundjeve orale",
                    	Date = DateTime.Now.AddMonths(-2),
                    	Category = "Stomatologji",
                    	City = "Prishtine",
                        Attendees = new List<JobAttendee>
                        {
                            new JobAttendee
                            {
                                AppUser = users[0],
                                IsPost = true
                            }
                        }
                    },
                    new Job
                    {
                        Title = "Doktor",
                        Description = "Diagnostikimi i problemeve shendetsore te femijet",
                        Date = DateTime.Now.AddMonths(-1),
                        Category = "Pediatri",
                        City = "Ferizaj",
                        Attendees = new List<JobAttendee>
                        {
                            new JobAttendee
                            {
                                AppUser = users[0],
                                IsPost = true
                            },
                            new JobAttendee
                            {
                                AppUser = users[1],
                                IsPost = false
                            },
                        }
                    },
                    new Job
                    {
                        Title = "Doktor",
                        Description = "Trajtim i dhimbjeve gjate operimeve me ane te anestezionit",
                        Date = DateTime.Now.AddMonths(1),
                        Category = "Anesteziologji",
                        City = "Prishtine",
                        Attendees = new List<JobAttendee>
                        {
                            new JobAttendee
                            {
                                AppUser = users[2],
                                IsPost = true
                            },
                            new JobAttendee
                            {
                                AppUser = users[1],
                                IsPost = false
                            },
                        }
                    },
                    new Job
                    {
                        Title = "Doktor",
                        Description = "Operacione te ndryshme",
                        Date = DateTime.Now.AddMonths(2),
                        Category = "Kirurgji",
                        City = "Prishtine",
                        Attendees = new List<JobAttendee>
                        {
                            new JobAttendee
                            {
                                AppUser = users[0],
                                IsPost = true
                            },
                            new JobAttendee
                            {
                                AppUser = users[2],
                                IsPost = false
                            },
                        }
                    },
                    new Job
                    {
                        Title = "Doktor",
                        Description = "Operacione te ndryshme",
                        Date = DateTime.Now.AddMonths(3),
                        Category = "Kirurgji",
                        City = "Peje",
                        Attendees = new List<JobAttendee>
                        {
                            new JobAttendee
                            {
                                AppUser = users[1],
                                IsPost = true                            
                            },
                            new JobAttendee
                            {
                                AppUser = users[0],
                                IsPost = false                            
                            },
                        }
                    },
                    new Job
                    {
                        Title = "Pastrues",
                        Description = "Pastrimi dhe dezinfektimi i objektit",
                        Date = DateTime.Now.AddMonths(4),
                        Category = "Pasterti",
                        City = "Prizren",
                        Attendees = new List<JobAttendee>
                        {
                            new JobAttendee
                            {
                                AppUser = users[1],
                                IsPost = true                            
                            }
                        }
                    },
                    new Job
                    {
                        Title = "Pastrues",
                        Description = "Pastrimi dhe dezinfektimi i objektit",
                        Date = DateTime.Now.AddMonths(5),
                        Category = "Pasterti",
                        City = "Mitrovice",
                        Attendees = new List<JobAttendee>
                        {
                            new JobAttendee
                            {
                                AppUser = users[0],
                                IsPost = true                            
                            },
                            new JobAttendee
                            {
                                AppUser = users[1],
                                IsPost = false                            
                            },
                        }
                    },
                    new Job
                    {
                        Title = "Rojtar",
                        Description = "Sigurim i objektit",
                        Date = DateTime.Now.AddMonths(6),
                        Category = "Siguri",
                        City = "Ferizaj",
                        Attendees = new List<JobAttendee>
                        {
                            new JobAttendee
                            {
                                AppUser = users[2],
                                IsPost = true                            
                            },
                            new JobAttendee
                            {
                                AppUser = users[1],
                                IsPost = false                            
                            },
                        }
                    },
                    new Job
                    {
                        Title = "Rojtar",
                        Description = "Sigurim i objektit",
                        Date = DateTime.Now.AddMonths(7),
                        Category = "Siguri",
                        City = "Ferizaj",
                        Attendees = new List<JobAttendee>
                        {
                            new JobAttendee
                            {
                                AppUser = users[0],
                                IsPost = true                            
                            },
                            new JobAttendee
                            {
                                AppUser = users[2],
                                IsPost = false                            
                            },
                        }
                    },
                    new Job
                    {
                        Title = "Drejtor",
                        Description = "Vendim-marrje dhe menaxhim",
                        Date = DateTime.Now.AddMonths(8),
                        Category = "Menaxhim",
                        City = "Peje",
                        Attendees = new List<JobAttendee>
                        {
                            new JobAttendee
                            {
                                AppUser = users[2],
                                IsPost = true                            
                            },
                            new JobAttendee
                            {
                                AppUser = users[1],
                                IsPost = false                            
                            },
                        }
                    }
                };

                await context.Jobs.AddRangeAsync(jobs);
                await context.SaveChangesAsync();
            }
        }
    }
}
