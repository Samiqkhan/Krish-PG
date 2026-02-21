import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LayoutDashboard, MapPin, Save, RefreshCw } from "lucide-react";
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateBranch = async (id: number, rooms: string, price: string) => {
    const { error } = await supabase
      .from('branches')
      .update({ 
        rooms: parseInt(rooms), 
        starting_price: parseInt(price) 
      })
      .eq('id', id);

    if (error) {
      toast({ title: "Update Failed", variant: "destructive" });
    } else {
      toast({ title: "Branch Updated Successfully" });
      fetchData();
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="w-64 bg-primary text-primary-foreground p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">Admin Portal</h2>
      </div>

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={fetchData} variant="outline" disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
        </div>

        <Tabs defaultValue="properties">
          <TabsList className="mb-4">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><MapPin size={20}/> Branches</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Branch Name</TableHead>
                      <TableHead>Rooms</TableHead>
                      <TableHead>Rent (₹)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {branches.map((branch: any) => (
                      <TableRow key={branch.id}>
                        <TableCell>{branch.name}</TableCell>
                        <TableCell>
                          <Input type="number" defaultValue={branch.rooms} id={`rooms-${branch.id}`} className="w-20" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" defaultValue={branch.starting_price} id={`price-${branch.id}`} className="w-28" />
                        </TableCell>
                        <TableCell>
                          <Button size="sm" onClick={() => {
                            const r = (document.getElementById(`rooms-${branch.id}`) as HTMLInputElement).value;
                            const p = (document.getElementById(`price-${branch.id}`) as HTMLInputElement).value;
                            handleUpdateBranch(branch.id, r, p);
                          }}><Save size={16}/></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookings">
             <Card>
              <CardHeader><CardTitle>Leads</CardTitle></CardHeader>
              <CardContent>
                <p>Total Leads: {bookings.length + leads.length}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;