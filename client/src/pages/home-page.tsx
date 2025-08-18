import CarouselContainer from "@/components/logo-carousel-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setValue } from "@/reducers/otherSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue) return;

    dispatch(setValue(inputValue));

    navigate("/register");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="text-wrap w-full sm:w-[50rem] flex flex-col gap-5 items-center justify-center">
        <h1 className="text-5xl text-center antialiased font-medium px-5">
          Connect, Share, Inspire, Build, Grow Together
        </h1>
        <p className="text-center">
          Commithub is a collaborative hub where developers connect, share
          projects, and grow together.
        </p>
        <form
          onSubmit={onSubmit}
          className="relative w-[90%] sm:w-[60%] mx-5 gap-2 flex flex-col items-center justify-center"
        >
          <Input
            type="text"
            placeholder="Enter your Email"
            className="md:pr-[10rem] w-full shadow-[0_2px_15px_rgba(255,255,255,0.8)]"
            value={inputValue}
            onChange={handleChange}
          />
          <Button type="submit" className="sm:absolute right-0 top-0">
            Sign Up to Connect
          </Button>
        </form>
      </div>
      <div className="mt-10 w-full items-center justify-center h-[25rem] overflow-x-hidden  relative SideShadowLeft">
        <CarouselContainer />
      </div>
    </div>
  );
};

export default Home;
