import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LayoutDashboard, Users, MessageSquare, MapPin, Save, RefreshCw } from "lucide-react";
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
      // 1. Fetch Branches
      const { data: bData } = await supabase.from('branches').select('*').order('name');
      // 2. Fetch Form Bookings
      const { data: bkData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      // 3. Fetch Chatbot Leads
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
      toast({ title: "Branch Updated" });
      fetchData();
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-primary-foreground p-6 hidden lg:block shadow-xl">
        <h2 className="text-2xl font-black tracking-tighter mb-8 italic">KRISH PG</h2>
        <nav className="space-y-2">
          <div className="flex items-center gap-3 py-3 px-4 bg-white/10 rounded-xl font-bold">
            <LayoutDashboard size={20}/> Dashboard
          </div>
        </nav>
      </div>

      <div className="flex-1 p-4 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black">Management Console</h1>
            <p className="text-muted-foreground text-sm">Real-time leads and property control</p>
          </div>
          <Button onClick={fetchData} variant="outline" className="rounded-xl border-2 font-bold" disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
          </Button>
        </div>

        <Tabs defaultValue="bookings" className="space-y-8">
          <TabsList className="bg-secondary/50 p-1 rounded-2xl h-14 w-full md:w-auto">
            <TabsTrigger value="bookings" className="rounded-xl px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Bookings</TabsTrigger>
            <TabsTrigger value="leads" className="rounded-xl px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Chat Leads</TabsTrigger>
            <TabsTrigger value="properties" className="rounded-xl px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Properties</TabsTrigger>
          </TabsList>

          {/* BOOKINGS TAB */}
          <TabsContent value="bookings">
            <Card className="rounded-[2rem] border-none shadow-card overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-100">
                <CardTitle className="flex items-center gap-2 font-black"><Users className="text-primary"/> Booking Form Submissions</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold">Name</TableHead>
                      <TableHead className="font-bold">Phone</TableHead>
                      <TableHead className="font-bold">Branch</TableHead>
                      <TableHead className="font-bold">Room Type</TableHead>
                      <TableHead className="font-bold">Move-in</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.length > 0 ? bookings.map((b: any) => (
                      <TableRow key={b.id} className="hover:bg-slate-50/50">
                        <TableCell className="font-bold">{b.name || "N/A"}</TableCell>
                        <TableCell>{b.phone || "N/A"}</TableCell>
                        <TableCell className="font-medium text-primary">{b.branch || "N/A"}</TableCell>
                        <TableCell>{b.room_type || "N/A"}</TableCell>
                        <TableCell>{b.move_in_date || "N/A"}</TableCell>
                      </TableRow>
                    )) : (
                      <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No bookings found</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CHAT LEADS TAB */}
          <TabsContent value="leads">
            <Card className="rounded-[2rem] border-none shadow-card overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-100">
                <CardTitle className="flex items-center gap-2 font-black"><MessageSquare className="text-primary"/> Chatbot Inquiries</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold">Name</TableHead>
                      <TableHead className="font-bold">Phone</TableHead>
                      <TableHead className="font-bold">Preferred Location</TableHead>
                      <TableHead className="font-bold">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.length > 0 ? leads.map((l: any) => (
                      <TableRow key={l.id} className="hover:bg-slate-50/50">
                        <TableCell className="font-bold">{l.name || "N/A"}</TableCell>
                        <TableCell>{l.phone || "N/A"}</TableCell>
                        <TableCell className="font-medium text-primary">{l.preferred_location || "N/A"}</TableCell>
                        <TableCell>{new Date(l.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    )) : (
                      <TableRow><TableCell colSpan={4} className="text-center py-10 text-muted-foreground">No chat leads found</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PROPERTIES TAB */}
          <TabsContent value="properties">
            <Card className="rounded-[2rem] border-none shadow-card overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-100">
                <CardTitle className="flex items-center gap-2 font-black"><MapPin className="text-primary"/> Branch Availability</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Branch</TableHead>
                      <TableHead className="font-bold">Rooms Available</TableHead>
                      <TableHead className="font-bold">Starting Rent (₹)</TableHead>
                      <TableHead className="text-right font-bold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {branches.map((branch: any) => (
                      <TableRow key={branch.id}>
                        <TableCell className="font-bold">{branch.name}</TableCell>
                        <TableCell><Input type="number" defaultValue={branch.rooms} id={`rooms-${branch.id}`} className="w-24 rounded-lg" /></TableCell>
                        <TableCell><Input type="number" defaultValue={branch.starting_price} id={`price-${branch.id}`} className="w-32 rounded-lg" /></TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" className="rounded-lg font-bold" onClick={() => {
                            const r = (document.getElementById(`rooms-${branch.id}`) as HTMLInputElement).value;
                            const p = (document.getElementById(`price-${branch.id}`) as HTMLInputElement).value;
                            handleUpdateBranch(branch.id, r, p);
                          }}><Save size={16} className="mr-2"/> Update</Button>
                        </TableCell>
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