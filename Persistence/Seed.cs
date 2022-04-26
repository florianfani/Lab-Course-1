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
                    Category = "Stomatologji",
                },
                new Job
                {
                    Title = "Doktor",
                    Description = "Diagnostikimi i problemeve shendetsore te femijet",
                    Category = "Pediatri",
                },
                new Job
                {
                    Title = "Doktor",
                    Description = "Trajtim i dhimbjeve gjate operimeve me ane te anestezionit",
                    Category = "Anesteziologji",
                },
                new Job
                {
                    Title = "Doktor",
                    Description = "Operacione te ndryshme",
                    Category = "Kirurgji",
                },
                new Job
                {
                    Title = "Doktor",
                    Description = "Operacione te ndryshme",
                    Category = "Kirurgji",
                },
                new Job
                {
                    Title = "Pastrues",
                    Description = "Pastrimi dhe dezinfektimi i objektit",
                    Category = "Pasterti",
                },
                new Job
                {
                    Title = "Pastrues",
                    Description = "Pastrimi dhe dezinfektimi i objektit",
                    Category = "Pasterti",
                },
                new Job
                {
                    Title = "Rojtar",
                    Description = "Sigurim i objektit",
                    Category = "Siguri",
                },
                new Job
                {
                    Title = "Rojtar",
                    Description = "Sigurim i objektit",
                    Category = "Siguri",
                },
                new Job
                {
                    Title = "Drejtor",
                    Description = "Vendim-marrje dhe menaxhim",
                    Category = "Menaxhim",
                }
            };

            await context.Jobs.AddRangeAsync(jobs);
            await context.SaveChangesAsync();
        }
    }
}