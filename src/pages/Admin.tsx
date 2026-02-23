import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  MapPin, 
  Save, 
  RefreshCw, 
  Building2, 
  Map as MapIcon,
  Info,
  ShieldCheck,
  Banknote
} from "lucide-react";
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
    } catch (error: any) {
      console.error("Fetch error:", error);
      toast({ title: "Sync Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleUpdateBranch = async (id: number) => {
    // Capturing all 8 dynamic fields for each branch
    const p1 = (document.getElementById(`p1-${id}`) as HTMLInputElement).value;
    const p2 = (document.getElementById(`p2-${id}`) as HTMLInputElement).value;
    const rooms = (document.getElementById(`rooms-${id}`) as HTMLInputElement).value;
    const maps = (document.getElementById(`map-${id}`) as HTMLInputElement).value;
    const l1 = (document.getElementById(`l1-${id}`) as HTMLInputElement).value;
    const l2 = (document.getElementById(`l2-${id}`) as HTMLInputElement).value;
    const rDesc = (document.getElementById(`rDesc-${id}`) as HTMLInputElement).value;
    const dDesc = (document.getElementById(`dDesc-${id}`) as HTMLInputElement).value;

    const { error } = await supabase
      .from('branches')
      .update({ 
        price_single_sharing: parseInt(p1), 
        price_double_sharing: parseInt(p2),
        rooms: parseInt(rooms),
        map_link: maps,
        landmark_1: l1,
        landmark_2: l2,
        room_desc: rDesc,
        deposit_desc: dDesc
      })
      .eq('id', id);

    if (error) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Branch Live!", description: "All changes updated on the website." });
      fetchData();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Navigation */}
      <div className="w-72 bg-slate-900 text-white p-8 hidden lg:block shadow-2xl">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-primary p-2 rounded-xl">
            <Building2 className="w-6 h-6 text-black" />
          </div>
          <h2 className="text-2xl font-black tracking-tighter italic">KRISH PG</h2>
        </div>
        <nav className="space-y-4 text-slate-400 font-bold">
          <div className="flex items-center gap-3 py-3 px-4 bg-primary text-black rounded-2xl shadow-lg border border-primary/20">
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className="px-4 py-2 text-xs uppercase tracking-[0.2em] opacity-50">Management</div>
          <button onClick={() => fetchData()} className="w-full flex items-center gap-3 py-3 px-4 hover:bg-white/5 rounded-2xl transition-all">
            <RefreshCw size={20} /> Sync Database
          </button>
        </nav>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 p-6 md:p-12 overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Control Center</h1>
            <p className="text-slate-500 font-medium mt-1">Directly manage branch details and customer leads.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={fetchData} variant="outline" className="rounded-2xl border-2 h-12 px-6 bg-white" disabled={loading}>
              <RefreshCw className={`mr-2 h-5 w-5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
          </div>
        </div>

        <Tabs defaultValue="properties" className="space-y-10">
          <TabsList className="bg-slate-200/50 p-1.5 rounded-2xl h-16 shadow-sm border">
            <TabsTrigger value="properties" className="rounded-xl px-10 font-black text-xs uppercase tracking-widest">Inventory</TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-xl px-10 font-black text-xs uppercase tracking-widest">Bookings</TabsTrigger>
            <TabsTrigger value="leads" className="rounded-xl px-10 font-black text-xs uppercase tracking-widest">Chats</TabsTrigger>
          </TabsList>

          {/* PROPERTIES MANAGEMENT */}
          <TabsContent value="properties">
            <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                <CardTitle className="font-black text-2xl flex gap-3 items-center">
                  <MapPin className="text-primary w-7 h-7"/> Live Branch Inventory
                </CardTitle>
                <div className="text-xs font-bold text-slate-400 italic">5 Total Branches</div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50/80">
                      <TableRow>
                        <TableHead className="px-8 font-bold text-xs uppercase text-slate-500">Branch Name</TableHead>
                        <TableHead className="font-bold text-xs uppercase text-slate-500">Pricing (₹)</TableHead>
                        <TableHead className="font-bold text-xs uppercase text-slate-500">Inventory</TableHead>
                        <TableHead className="font-bold text-xs uppercase text-slate-500">Nearby Landmarks</TableHead>
                        <TableHead className="font-bold text-xs uppercase text-slate-500">Room Details</TableHead>
                        <TableHead className="text-right px-8 font-bold text-xs uppercase text-slate-500">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {branches.map((b: any) => (
                        <TableRow key={b.id} className="hover:bg-slate-50/50 transition-colors border-b">
                          <TableCell className="px-8 font-black text-slate-800 text-lg">
                            {b.name}
                            <div className="mt-1">
                               <Input placeholder="Maps Link" defaultValue={b.map_link} id={`map-${b.id}`} className="w-32 h-7 text-[10px] rounded-lg" />
                            </div>
                          </TableCell>
                          
                          {/* PRICING */}
                          <TableCell>
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400 w-4">1S</span>
                                <Input type="number" defaultValue={b.price_single_sharing} id={`p1-${b.id}`} className="w-24 h-9 font-bold rounded-xl" />
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400 w-4">2S</span>
                                <Input type="number" defaultValue={b.price_double_sharing} id={`p2-${b.id}`} className="w-24 h-9 font-bold rounded-xl" />
                              </div>
                            </div>
                          </TableCell>

                          {/* ROOMS */}
                          <TableCell>
                             <div className="flex flex-col items-center">
                               <span className="text-[10px] font-bold mb-1">Available</span>
                               <Input type="number" defaultValue={b.rooms} id={`rooms-${b.id}`} className="w-16 h-10 font-black text-center rounded-xl border-primary/20" />
                             </div>
                          </TableCell>

                          {/* LANDMARKS */}
                          <TableCell>
                            <div className="flex flex-col gap-1.5">
                               <Input placeholder="Eon IT Park (1.2km)" defaultValue={b.landmark_1} id={`l1-${b.id}`} className="w-40 h-9 text-xs font-semibold rounded-xl" />
                               <Input placeholder="Main Market (0.5km)" defaultValue={b.landmark_2} id={`l2-${b.id}`} className="w-40 h-9 text-xs font-semibold rounded-xl" />
                            </div>
                          </TableCell>

                          {/* DETAILS */}
                          <TableCell>
                            <div className="flex flex-col gap-1.5">
                               <div className="flex items-center gap-2">
                                 <ShieldCheck size={14} className="text-green-500" />
                                 <Input placeholder="Room Condition" defaultValue={b.room_desc} id={`rDesc-${b.id}`} className="w-48 h-9 text-xs rounded-xl" />
                               </div>
                               <div className="flex items-center gap-2">
                                 <Banknote size={14} className="text-blue-500" />
                                 <Input placeholder="Advance Terms" defaultValue={b.deposit_desc} id={`dDesc-${b.id}`} className="w-48 h-9 text-xs rounded-xl" />
                               </div>
                            </div>
                          </TableCell>

                          <TableCell className="text-right px-8">
                            <Button size="lg" className="rounded-xl font-black shadow-md hover:scale-105 active:scale-95 transition-all" onClick={() => handleUpdateBranch(b.id)}>
                              <Save size={18} className="mr-2"/> SAVE
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* BOOKINGS TAB */}
          <TabsContent value="bookings">
            <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="p-8 border-b border-slate-100"><CardTitle className="font-black flex gap-2"><Users className="text-primary"/> Form Submissions</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="px-8 font-bold">Name</TableHead>
                      <TableHead className="font-bold">Email</TableHead>
                      <TableHead className="font-bold">Phone</TableHead>
                      <TableHead className="font-bold">Selected Branch</TableHead>
                      <TableHead className="font-bold">Submission Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((b: any) => (
                      <TableRow key={b.id}>
                        <TableCell className="px-8 font-bold">{b.name}</TableCell>
                        <TableCell className="text-blue-600 font-medium">{b.email || "N/A"}</TableCell>
                        <TableCell>{b.phone}</TableCell>
                        <TableCell className="font-bold text-primary">{b.branch}</TableCell>
                        <TableCell className="text-xs">{new Date(b.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CHAT LEADS TAB */}
          <TabsContent value="leads">
            <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="p-8 border-b border-slate-100"><CardTitle className="font-black flex gap-2"><MessageSquare className="text-primary"/> Chatbot History</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="px-8 font-bold">Name</TableHead>
                      <TableHead className="font-bold">Email</TableHead>
                      <TableHead className="font-bold">Phone</TableHead>
                      <TableHead className="font-bold">Location Interested</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((l: any) => (
                      <TableRow key={l.id}>
                        <TableCell className="px-8 font-bold">{l.name}</TableCell>
                        <TableCell className="text-blue-600 font-medium">{l.email || "N/A"}</TableCell>
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