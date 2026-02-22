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
  User, 
  Users as UsersIcon 
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
    // Getting values from the specific inputs using unique IDs
    const p1 = (document.getElementById(`price1-${id}`) as HTMLInputElement).value;
    const p2 = (document.getElementById(`price2-${id}`) as HTMLInputElement).value;
    const rooms = (document.getElementById(`rooms-${id}`) as HTMLInputElement).value;
    const maps = (document.getElementById(`map-${id}`) as HTMLInputElement).value;

    const { error } = await supabase
      .from('branches')
      .update({ 
        price_single_sharing: parseInt(p1), 
        price_double_sharing: parseInt(p2),
        starting_price: parseInt(p2), // Syncing old column for compatibility
        rooms: parseInt(rooms),
        map_link: maps
      })
      .eq('id', id);

    if (error) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Branch Updated", description: "Prices and location are now live." });
      fetchData();
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-slate-900 text-white p-8 hidden lg:block shadow-2xl">
        <div className="flex items-center gap-3 mb-10">
          <Building2 className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-black tracking-tighter italic">KRISH PG</h2>
        </div>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 py-3 px-4 bg-white/10 rounded-2xl font-bold border border-white/5">
            <LayoutDashboard size={20} className="text-primary"/> Dashboard
          </div>
        </nav>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 p-5 md:p-12 overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Admin Console</h1>
            <p className="text-muted-foreground font-medium">Manage Pricing, Availability, and Map Locations.</p>
          </div>
          <Button onClick={fetchData} variant="outline" className="rounded-2xl border-2 font-bold h-12 px-6 shadow-sm bg-white" disabled={loading}>
            <RefreshCw className={`mr-2 h-5 w-5 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
          </Button>
        </div>

        <Tabs defaultValue="properties" className="space-y-10">
          <TabsList className="bg-slate-200/50 p-1.5 rounded-2xl h-16 shadow-sm border">
            <TabsTrigger value="properties" className="rounded-xl px-10 font-black text-xs uppercase">Inventory</TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-xl px-10 font-black text-xs uppercase">Bookings</TabsTrigger>
            <TabsTrigger value="leads" className="rounded-xl px-10 font-black text-xs uppercase">Chat Leads</TabsTrigger>
          </TabsList>

          {/* PROPERTIES MANAGEMENT */}
          <TabsContent value="properties">
            <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="p-8 border-b border-slate-100">
                <CardTitle className="font-black text-2xl flex gap-3 items-center">
                  <MapPin className="text-primary w-7 h-7"/> Branch Live Data
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50/80">
                      <TableRow>
                        <TableHead className="px-8 font-bold text-xs uppercase text-slate-500">Branch Name</TableHead>
                        <TableHead className="font-bold text-xs uppercase text-slate-500">1 Share (₹)</TableHead>
                        <TableHead className="font-bold text-xs uppercase text-slate-500">2 Share (₹)</TableHead>
                        <TableHead className="font-bold text-xs uppercase text-slate-500">Rooms</TableHead>
                        <TableHead className="font-bold text-xs uppercase text-slate-500">Google Maps URL</TableHead>
                        <TableHead className="text-right px-8 font-bold text-xs uppercase text-slate-500">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {branches.map((branch: any) => (
                        <TableRow key={branch.id} className="hover:bg-slate-50/50 transition-colors">
                          <TableCell className="px-8 font-black text-slate-800 text-base">{branch.name}</TableCell>
                          
                          {/* 1 Sharing Price */}
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-slate-400" />
                              <Input type="number" defaultValue={branch.price_single_sharing} id={`price1-${branch.id}`} className="w-28 font-bold rounded-xl border-slate-200 h-10" />
                            </div>
                          </TableCell>

                          {/* 2 Sharing Price */}
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <UsersIcon size={14} className="text-slate-400" />
                              <Input type="number" defaultValue={branch.price_double_sharing} id={`price2-${branch.id}`} className="w-28 font-bold rounded-xl border-slate-200 h-10" />
                            </div>
                          </TableCell>

                          {/* Rooms Left */}
                          <TableCell>
                            <Input type="number" defaultValue={branch.rooms} id={`rooms-${branch.id}`} className="w-20 font-bold rounded-xl border-slate-200 h-10" />
                          </TableCell>

                          {/* Map Link */}
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapIcon size={14} className="text-slate-400 shrink-0" />
                              <Input placeholder="Paste URL here" defaultValue={branch.map_link} id={`map-${branch.id}`} className="w-48 text-xs rounded-xl border-slate-200 h-10" />
                            </div>
                          </TableCell>

                          <TableCell className="text-right px-8">
                            <Button size="sm" className="rounded-xl font-black shadow-md hover:scale-105 active:scale-95 transition-all" onClick={() => handleUpdateBranch(branch.id)}>
                              <Save size={16} className="mr-2"/> SAVE
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

          {/* LEADS & BOOKINGS TABS */}
          <TabsContent value="bookings">
            <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="p-8 border-b border-slate-100"><CardTitle className="font-black flex gap-2"><UsersIcon className="text-primary"/> Booking Form Leads</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="px-8 font-bold">Customer Name</TableHead>
                      <TableHead className="font-bold">Email Address</TableHead>
                      <TableHead className="font-bold">Phone</TableHead>
                      <TableHead className="font-bold">Selected Branch</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((b: any) => (
                      <TableRow key={b.id}>
                        <TableCell className="px-8 font-bold">{b.name}</TableCell>
                        <TableCell className="text-blue-600 font-medium">{b.email || "N/A"}</TableCell>
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
            <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="p-8 border-b border-slate-100"><CardTitle className="font-black flex gap-2"><MessageSquare className="text-primary"/> Chatbot History</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="px-8 font-bold">Lead Name</TableHead>
                      <TableHead className="font-bold">Email</TableHead>
                      <TableHead className="font-bold">Phone</TableHead>
                      <TableHead className="font-bold">Preferred Location</TableHead>
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