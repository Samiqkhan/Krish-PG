import { XCircle, CheckCircle2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Comparison = () => {
  const comparisonData = [
    { feature: "Security", standard: "Basic Security", premium: "High Security + CCTV" },
    { feature: "Wi-Fi", standard: "Shared 20-50 Mbps", premium: "Dedicated 200+ Mbps" },
    { feature: "Cleanliness", standard: "Weekly / On-request", premium: "Professional Daily Cleaning" },
    { feature: "Management", standard: "Manual / Slow Response", premium: "App-based Support + On-site Manager" },
    { feature: "Hidden Costs", standard: "Security Deposit + Brokerage", premium: "Zero Brokerage + Clear Pricing" },
    
  ];

  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">The Difference</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Why We Are Better</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A direct look at how we provide a superior living experience compared to standard local PGs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 shadow-card border border-border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[180px] text-lg font-bold">Feature</TableHead>
                <TableHead className="text-muted-foreground italic text-lg">Standard PG</TableHead>
                <TableHead className="text-primary font-bold text-lg">PG Comfort Connect</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row) => (
                <TableRow key={row.feature} className="hover:bg-primary/5">
                  <TableCell className="font-semibold py-6">{row.feature}</TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0" /> 
                      {row.standard}
                    </div>
                  </TableCell>
                  <TableCell className="text-primary font-bold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" /> 
                      {row.premium}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default Comparison;