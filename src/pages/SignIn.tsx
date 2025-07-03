// src/pages/SignIn.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface SignInResponse {
  token: string;
  user: {
    id: number;
    email: string;
    first_name: string | null;
    last_name: string | null;
  };
}

const SignIn: React.FC = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://3.128.160.75:8000/accounts/signin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setLoading(false);
        toast.error(errData.error || "Failed to sign in");
        return;
      }

      const data: SignInResponse = await res.json();

      const firstName = data.user.first_name || "";
      const lastName  = data.user.last_name  || "";
      const fullName  = `${firstName} ${lastName}`.trim() || "No Name";

      setUser({
        id: data.user.id,        // IMPORTANT: add user id here
        token: data.token,       // token string
        name: fullName,
        email: data.user.email,
      });

      toast.success("Signed in successfully!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Sign in to InspectorIQ
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-inspectoriq-blue hover:bg-blue-600 text-white py-2"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-inspectoriq-blue hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignIn;
