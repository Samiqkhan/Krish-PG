import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LayoutDashboard, Users, MessageSquare, MapPin, Save, RefreshCw, Building2, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Admin = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [leads, setLeads] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: bData } = await supabase.from('branches').select('*').order('name');
      const { data: bkData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      const { data: lData } = await supabase.from('chatbot_leads').select('*').order('created_at', { ascending: false });
      
      setBranches(bData || []);
      setBookings(bkData || []);
      setLeads(lData || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleUpdateBranch = async (id: number, rooms: string, price: string) => {
    const { error } = await supabase
      .from('branches')
      .update({ rooms: parseInt(rooms), starting_price: parseInt(price) })
      .eq('id', id);

    if (error) {
      toast({ title: "Update Failed", variant: "destructive" });
    } else {
      toast({ title: "Branch Details Updated" });
      fetchData();
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="w-64 bg-primary text-primary-foreground p-8 hidden lg:block shadow-2xl">
        <div className="flex items-center gap-3 mb-10">
          <Building2 className="w-8 h-8" />
          <h2 className="text-2xl font-black tracking-tighter italic text-black">KRISH PG</h2>
        </div>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 py-3 px-4 bg-black/10 rounded-2xl font-bold">
            <LayoutDashboard size={20}/> Dashboard
          </div>
        </nav>
      </div>

      <div className="flex-1 p-5 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Admin Console</h1>
            <p className="text-muted-foreground font-medium">Monitoring leads for your 5 branches.</p>
          </div>
          <Button onClick={fetchData} variant="outline" className="rounded-2xl border-2 font-bold h-12" disabled={loading}>
            <RefreshCw className={`mr-2 h-5 w-5 ${loading ? 'animate-spin' : ''}`} /> Sync Data
          </Button>
        </div>

        <Tabs defaultValue="properties" className="space-y-10">
          <TabsList className="bg-slate-200/50 p-1.5 rounded-2xl h-16 shadow-sm">
            <TabsTrigger value="properties" className="rounded-xl px-10 font-black text-xs">PROPERTIES</TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-xl px-10 font-black text-xs">BOOKINGS</TabsTrigger>
            <TabsTrigger value="leads" className="rounded-xl px-10 font-black text-xs">CHAT LEADS</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden">
              <CardHeader className="bg-white p-8 border-b"><CardTitle className="font-black text-2xl flex gap-2"><MapPin className="text-primary"/> Branch Pricing</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="px-8 font-bold text-xs">Branch</TableHead>
                      <TableHead className="font-bold text-xs">Rooms Available</TableHead>
                      <TableHead className="font-bold text-xs">Rent (₹)</TableHead>
                      <TableHead className="text-right px-8 font-bold text-xs">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {branches.map((branch: any) => (
                      <TableRow key={branch.id}>
                        <TableCell className="px-8 font-black">{branch.name}</TableCell>
                        <TableCell><Input type="number" defaultValue={branch.rooms} id={`rooms-${branch.id}`} className="w-24 rounded-xl font-bold" /></TableCell>
                        <TableCell><Input type="number" defaultValue={branch.starting_price} id={`price-${branch.id}`} className="w-32 rounded-xl font-bold" /></TableCell>
                        <TableCell className="text-right px-8">
                          <Button size="sm" className="rounded-xl font-black" onClick={() => {
                            const r = (document.getElementById(`rooms-${branch.id}`) as HTMLInputElement).value;
                            const p = (document.getElementById(`price-${branch.id}`) as HTMLInputElement).value;
                            handleUpdateBranch(branch.id, r, p);
                          }}><Save size={16} className="mr-2"/> SAVE</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden">
              <CardHeader className="bg-white border-b"><CardTitle className="font-black flex gap-2"><Users className="text-primary"/> Form Leads</CardTitle></CardHeader>
              <CardContent className="p-0 text-sm">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Branch</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((b: any) => (
                      <TableRow key={b.id}>
                        <TableCell className="font-bold">{b.name}</TableCell>
                        <TableCell className="text-blue-600">{b.email || "N/A"}</TableCell>
                        <TableCell>{b.phone}</TableCell>
                        <TableCell className="font-bold text-primary">{b.branch}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads">
            <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden">
              <CardHeader className="bg-white border-b"><CardTitle className="font-black flex gap-2"><MessageSquare className="text-primary"/> Chatbot Leads</CardTitle></CardHeader>
              <CardContent className="p-0 text-sm">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((l: any) => (
                      <TableRow key={l.id}>
                        <TableCell className="font-bold">{l.name}</TableCell>
                        <TableCell className="text-blue-600">{l.email || "N/A"}</TableCell>
                        <TableCell>{l.phone}</TableCell>
                        <TableCell className="font-bold text-primary">{l.preferred_location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;