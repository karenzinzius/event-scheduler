import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/token";
import { apiFetch } from "../api/apiFetch";

type SignInData = {
  email: string;
  password: string;
};

type AuthResponse = {
  token: string;
};

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data: AuthResponse = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setToken(data.token);
      
      
      navigate("/create-event");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center relative" data-theme="dark">
      {/* Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 btn btn-ghost btn-circle"
      >
        ←
      </button>

      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold mb-1">Welcome back</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Sign in to your account to continue
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/signup" className="link link-primary">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
