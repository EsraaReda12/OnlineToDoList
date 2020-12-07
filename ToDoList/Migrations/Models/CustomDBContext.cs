using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ToDoList.Models
{
    public partial class CustomDBContext:DbContext
    {
        public CustomDBContext() : base("Name=DefaultConnection") { }
        public DbSet<ToDoList> ToDoLists { get; set; }
    }
}