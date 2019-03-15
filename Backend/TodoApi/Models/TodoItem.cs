using System;

namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Date {get; set;}
        public string Operator {get; set;}
        public string Importance {get; set;}


    }
}