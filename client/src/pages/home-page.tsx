import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Home = () => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="text-wrap w-full sm:w-[50rem] flex flex-col gap-5 items-center justify-center">
        <h1 className="text-5xl text-center antialiased font-medium">
          Connect, Share, Inspire, Build, Grow Together
        </h1>
        <p className="text-center">
          Commithub is a collaborative hub where developers connect, share
          projects, and grow together.
        </p>
        <div className="relative w-[60%]">
          <Input
            type="text"
            placeholder="Enter your Email"
            className="pr-[10rem] w-full"
          />
          <Button className="absolute right-0 top-0 h-full">
            Sign Up to Connect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
