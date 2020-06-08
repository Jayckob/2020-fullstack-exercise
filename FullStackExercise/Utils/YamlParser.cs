using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using YamlDotNet.RepresentationModel;
using YamlDotNet.Serialization;
using FullStackExercise.Models;

namespace FullStackExercise.Utils
{
    public class YamlParser
    {
        readonly string filepath = "Models/Data.yaml";

        public List<customers> parseCustomers()
        {
            List<customers> cust = new List<customers>();
            Deserializer deserializer = new Deserializer();

            using (var reader = new StreamReader(filepath))
            {
                DataPool items = deserializer.Deserialize<DataPool>(reader.ReadToEnd());
                cust.AddRange(items.customers);
                return cust;
            }

        }

        public List<auth> parseUsers()
        {
            List<auth> auth = new List<auth>();
            Deserializer deserializer = new Deserializer();

            using (var reader = new StreamReader(filepath))
            {
                DataPool items = deserializer.Deserialize<DataPool>(reader.ReadToEnd());
                auth.AddRange(items.auth);
                return auth;
            }

        }
    }
}
