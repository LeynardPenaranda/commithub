import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the password matches
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }
  };

  return (
    <div className="max-w-5xl min-h-[80vh]  mx-auto flex flex-col gap-5 items-center">
      <h1 className="text-4xl font-bold text-center">Sign Up</h1>
      <span className="flex flex-col md:flex-row gap-2 mt-10 items-center justify-center">
        <UserPlus />
        <p className="text-muted-foreground text-center">
          Create your account to join our community
        </p>
      </span>

      <Card className="w-full max-w-md p-6 bg-background shadow-[0_2px_15px_rgba(255,255,255,0.8)]">
        <form onSubmit={(e) => onSubmit(e)} className="space-y-5">
          <span className="text-sm text-center">
            Note:
            <p className="text-muted-foreground mb-5">
              This site uses Gravatar for profile pictures. Please use the same
              email address you use on Gravatar to get your profile picture.
            </p>
          </span>
          <div>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
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
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
          <div className="flex gap-2 text-sm">
            <p>Already have an account?</p>
            <Link to="/login">Sign In</Link>
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

export default Register;
