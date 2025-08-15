import { useTheme } from "./context/theme-provider";
import { motion } from "framer-motion";
const CarouselContainer = () => {
  const { theme } = useTheme();

  const logo = [
    {
      src:
        theme === "light" ? "logos/BitForge.png" : "logosDark/BitForgeDark.png",
    },
    {
      src:
        theme === "light" ? "logos/CodeNest.png" : "logosDark/CodeNestDark.png",
    },
    {
      src:
        theme === "light"
          ? "logos/CodePulse.png"
          : "logosDark/CodePulseDark.png",
    },
    {
      src:
        theme === "light"
          ? "logos/DevHorizon.png"
          : "logosDark/DevHorizonDark.png",
    },
    {
      src:
        theme === "light" ? "logos/HackLoom.png" : "logosDark/HackLoomDark.png",
    },
    {
      src:
        theme === "light"
          ? "logos/PixelCrafters.png"
          : "logosDark/PixelCraftersDark.png",
    },
    {
      src:
        theme === "light"
          ? "logos/StackBridge.png"
          : "logosDark/StackBridgeDark.png",
    },
    {
      src:
        theme === "light" ? "logos/TechHive.png" : "logosDark/TechHiveDark.png",
    },
  ];

  return (
    <div className="absolute SideShadow h-full place-content-center">
      {/* Upper Logo Carousel */}
      <div className="flex ">
        <motion.div
          initial={{
            x: "-100%",
          }}
          animate={{
            x: 0,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-shrink-0"
        >
          {logo.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Logo ${index + 1}`}
              className="w-10 sm:w-15 md:w-24  h-10 sm:h-15 md:h-24 mr-10 sm:mr-15 md:mr-30 drop-shadow-[0_2px_15px_rgba(255,255,255,0.8)]"
            />
          ))}
        </motion.div>
        <motion.div
          initial={{
            x: "-100%",
          }}
          animate={{
            x: 0,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-shrink-0"
        >
          {logo.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Logo ${index + 1}`}
              className="w-10 sm:w-15 md:w-24  h-10 sm:h-15 md:h-24 mr-10 sm:mr-15 md:mr-30 drop-shadow-[0_2px_15px_rgba(255,255,255,0.8)]"
            />
          ))}
        </motion.div>
      </div>

      {/* Lower Logo Carousel */}
      <div className="flex mt-10">
        <motion.div
          initial={{
            x: 0,
          }}
          animate={{
            x: "-100%",
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-shrink-0"
        >
          {logo.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Logo ${index + 1}`}
              className="w-10 sm:w-15 md:w-24  h-10 sm:h-15 md:h-24 mr-10 sm:mr-15 md:mr-30 drop-shadow-[0_2px_15px_rgba(255,255,255,0.8)]"
            />
          ))}
        </motion.div>
        <motion.div
          initial={{
            x: 0,
          }}
          animate={{
            x: "-100%",
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-shrink-0"
        >
          {logo.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Logo ${index + 1}`}
              className="w-10 sm:w-15 md:w-24  h-10 sm:h-15 md:h-24 mr-10 sm:mr-15 md:mr-30 drop-shadow-[0_2px_15px_rgba(255,255,255,0.8)]"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CarouselContainer;
