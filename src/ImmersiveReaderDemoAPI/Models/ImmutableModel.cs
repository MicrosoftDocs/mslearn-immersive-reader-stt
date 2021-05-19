using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace ImmersiveReaderDemoAPI.Models
{
    public class LineItem
    {
        public Decimal Total { get; set; }
    }
    
    public class Order {
        public Guid Id { get; set; }
        public string OrderNumber { get; set; }
        public IList<LineItem> Items { get; set; }

        public Decimal Total
        {
            get { return Items.Select(i => i.Total).Sum(); }
        }
    }
}