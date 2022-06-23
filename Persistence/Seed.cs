using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Jobs.Any()) return;
            
            var jobs = new List<Job>
            {
                new Job
                {
                    Title = "Doktor",
                    Description = "Trajtimi i problemeve dhe semundjeve orale",
                    Date = DateTime.Now.AddMonths(-2),
                    Category = "Stomatologji",
                    City = "Prishtine",
                },
                new Job
                {
                    Title = "Doktor",
                    Description = "Diagnostikimi i problemeve shendetsore te femijet",
                    Date = DateTime.Now.AddMonths(-1),
                    Category = "Pediatri",
                    City = "Ferizaj",
                },
                new Job
                {
                    Title = "Doktor",
                    Description = "Trajtim i dhimbjeve gjate operimeve me ane te anestezionit",
                    Date = DateTime.Now.AddMonths(1),
                    Category = "Anesteziologji",
                    City = "Prishtine",
                },
                new Job
                {
                    Title = "Doktor",
                    Description = "Operacione te ndryshme",
                    Date = DateTime.Now.AddMonths(2),
                    Category = "Kirurgji",
                    City = "Prishtine",
                },
                new Job
                {
                    Title = "Doktor",
                    Description = "Operacione te ndryshme",
                    Date = DateTime.Now.AddMonths(3),
                    Category = "Kirurgji",
                    City = "Peje",
                },
                new Job
                {
                    Title = "Pastrues",
                    Description = "Pastrimi dhe dezinfektimi i objektit",
                    Date = DateTime.Now.AddMonths(4),
                    Category = "Pasterti",
                    City = "Prizren",
                },
                new Job
                {
                    Title = "Pastrues",
                    Description = "Pastrimi dhe dezinfektimi i objektit",
                    Date = DateTime.Now.AddMonths(5),
                    Category = "Pasterti",
                    City = "Mitrovice",
                },
                new Job
                {
                    Title = "Rojtar",
                    Description = "Sigurim i objektit",
                    Date = DateTime.Now.AddMonths(6),
                    Category = "Siguri",
                    City = "Ferizaj",
                },
                new Job
                {
                    Title = "Rojtar",
                    Description = "Sigurim i objektit",
                    Date = DateTime.Now.AddMonths(7),
                    Category = "Siguri",
                    City = "Ferizaj",
                },
                new Job
                {
                    Title = "Drejtor",
                    Description = "Vendim-marrje dhe menaxhim",
                    Date = DateTime.Now.AddMonths(8),
                    Category = "Menaxhim",
                    City = "Peje",
                }
            };

            await context.Jobs.AddRangeAsync(jobs);
            await context.SaveChangesAsync();
        }
    }
}