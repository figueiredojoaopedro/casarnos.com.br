import FloatingWeddingEmojisBackground from "@/app/components/floatingWeddingEmojis/floating-wedding-emojis";
import Services from "./components/providedServices/services";
import Pricing from "./components/pricing/pricing";
import About from "./components/about/about";
export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-white to-gray-100 flex flex-col items-center justify-center h-full w-screen px-2 sm:px-10 md:px-20 lg:px-36">
        <FloatingWeddingEmojisBackground></FloatingWeddingEmojisBackground>
        <Services></Services>
        {/* <Pricing></Pricing> */}
        {/* <About></About> */}
      </section>
    </div>
  );
}
