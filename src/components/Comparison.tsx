import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const comparisonData = [
  { feature: "Security", standard: "Basic Entry Only", premium: "Biometric + 24/7 CCTV" },
  { feature: "Wi-Fi", standard: "Shared 20-50 Mbps", premium: "Dedicated 200+ Mbps Fiber" },
  { feature: "Cleanliness", standard: "Weekly / On-request", premium: "Professional Daily Cleaning" },
  { feature: "Management", standard: "Manual / Slow Response", premium: "Dedicated On-site Manager" },
  { feature: "Hidden Costs", standard: "Brokerage + High Deposit", premium: "Zero Brokerage + Transparent" },
];

const Comparison = () => {
  return (
    <section id="comparison" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">The Krish Standard</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 leading-tight uppercase italic">
            How We Stand Out
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        {/* MOBILE VIEW: Side-by-Side Cards (Hidden on Desktop) */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {comparisonData.map((row) => (
            <div key={row.feature} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-black text-lg text-slate-900 mb-4 pb-2 border-b border-slate-200 uppercase tracking-tighter">
                {row.feature}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 opacity-60">
                  <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Local PG</p>
                    <p className="text-sm font-bold text-slate-600">{row.standard}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-primary">Krish PG</p>
                    <p className="text-sm font-black text-slate-900">{row.premium}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW: Premium Table (Hidden on Mobile) */}
        <div className="hidden md:block max-w-5xl mx-auto bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-0" />
          
          <Table className="relative z-10">
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b-2 border-slate-100">
                <TableHead className="w-[220px] text-xl font-black text-slate-900 py-6 uppercase tracking-tighter italic">Features</TableHead>
                <TableHead className="text-slate-400 font-bold text-lg py-6 uppercase tracking-widest">Standard local PG</TableHead>
                <TableHead className="text-primary font-black text-xl py-6 uppercase tracking-widest">Krish PG Experience</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row) => (
                <TableRow key={row.feature} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50">
                  <TableCell className="font-black text-slate-800 py-8 text-lg">{row.feature}</TableCell>
                  <TableCell className="text-slate-500 font-medium py-8">
                    <div className="flex items-center gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                      <XCircle className="w-5 h-5 text-destructive shrink-0" /> 
                      {row.standard}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-900 font-black py-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-1.5 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      </div>
                      {row.premium}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Footer Call to Action in Table */}
          <div className="mt-10 p-6 bg-primary/5 rounded-[2rem] border border-primary/10 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-600 italic">Experience the difference in every detail.</p>
            <button 
              onClick={() => document.getElementById('branches')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 font-black text-primary hover:gap-3 transition-all uppercase tracking-widest text-xs"
            >
              Choose Excellence <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Comparison;