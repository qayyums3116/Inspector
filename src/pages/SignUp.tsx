// src/pages/SignUp.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Split full name into first and last name
    const nameParts = fullName.trim().split(" ");
    const first_name = nameParts[0] || "";
    const last_name = nameParts.slice(1).join(" ") || "";

    setLoading(true);

    try {
      const res = await fetch("http://3.128.160.75:8000/accounts/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          confirm_password: confirmPassword, // if backend expects this field
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        toast.error(errData.detail || "Failed to sign up");
        setLoading(false);
        console.log(res)
        return;
      }

      await res.json();
      toast.success("Registered successfully! Please Sign-in");
      navigate("/signin", { replace: true });
    } catch {
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
            Create your InspectorIQ account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-inspectoriq-blue hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignUp;
