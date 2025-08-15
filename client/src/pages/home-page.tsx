import CarouselContainer from "@/components/logo-carousel-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Home = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center">
      <div className="text-wrap w-full sm:w-[50rem] flex flex-col gap-5 items-center justify-center">
        <h1 className="text-5xl text-center antialiased font-medium px-5">
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
            className="pr-[10rem] w-full shadow-[0_2px_15px_rgba(255,255,255,0.8)]"
          />
          <Button className="absolute right-0 top-0 h-full">
            Sign Up to Connect
          </Button>
        </div>
      </div>
      <div className="mt-10 w-full items-center justify-center h-[25rem] overflow-x-hidden  relative SideShadowLeft ">
        <CarouselContainer />
      </div>
    </div>
  );
};

export default Home;
