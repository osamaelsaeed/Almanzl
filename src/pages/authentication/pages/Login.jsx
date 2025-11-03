import { useContext, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../authentication/context/AuthContext";
import LoadingButton from "../../../components/LoadingButton";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorBar from "../../../components/Error";

export default function Login() {
  const { login, loading, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = useLocation().state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }
    await login(form);
    navigate(from, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>

      {loading && <LoadingSpinner resource="auth" />}
      {error && <ErrorBar resource="auth" error={error} />}

      <div className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          autoComplete="email"
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          autoComplete="current-password"
        />
        <LoadingButton
          title="Sign in"
          onClick={submit}
          width="100%"
          style={{
            margin: "2rem auto",
          }}
        />
      </div>

      <div className="mt-3 flex justify-between text-sm">
        <Link to="/forgotPassword" className="text-yellow-600 hover:underline">
          Forgot password?
        </Link>
        <Link to="/signup" className="text-yellow-600 hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
}
