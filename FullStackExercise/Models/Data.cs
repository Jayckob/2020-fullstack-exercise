using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FullStackExercise.Models
{
    public class DataPool
    {
        public auth[] auth { get; set; }
        public customers[] customers { get; set; }
    }

    public class auth
    {
        public string password { get; set; }
        public string username { get; set; }
    }

    public class customers
    {
        public string id { get; set; }
        public int num_employees { get; set; }
        public string name { get; set; }
        public List<string> tags {
            get;
            set; 
        }
    }
}
