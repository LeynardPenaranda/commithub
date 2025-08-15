import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("success");
  };

  return (
    <div className="max-w-5xl min-h-[80vh]  mx-auto flex flex-col gap-5 items-center">
      <h1 className="text-4xl font-bold text-center">Sign In</h1>
      <span className="flex flex-col md:flex-row gap-2 mt-10 items-center justify-center">
        <p className="text-muted-foreground text-center">
          Sign in to your account
        </p>
      </span>

      <Card className="w-full max-w-md p-6 bg-background shadow-[0_2px_15px_rgba(255,255,255,0.8)]">
        <form onSubmit={(e) => onSubmit(e)} className="space-y-5">
          <div>
            <Input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
          <div className="flex gap-2 text-sm">
            <p>dont have an account?</p>
            <Link to="/register">Sign Up</Link>
          </div>
        </form>
        <div>
          <div className="border-b relative place-items-center">
            <p className="absolute top-[-12px] px-5 bg-background">or</p>
          </div>
          <div className="mt-10 border rounded-2xl p-3 flex items-center gap-2">
            <img src="/images/googleLogo.png" alt="google" className="w-15" />
            <p className="text-sm text-wrap text-muted-foreground text-center">
              We’re working on Google Login. Stay tuned — coming soon!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
