//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ST10114615_PROG7312_POE_TASK_1.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class DeweyDecimalTrainingEntities2 : DbContext
    {
        public DeweyDecimalTrainingEntities2()
            : base("name=DeweyDecimalTrainingEntities2")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<IdentifyScore> IdentifyScores { get; set; }
        public virtual DbSet<SortTime> SortTimes { get; set; }
        public virtual DbSet<FindingScore> FindingScores { get; set; }
    }
}
