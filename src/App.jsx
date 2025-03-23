import Navbar from "./sections/Navbar";
import About from "./sections/About";
import BentoGrid from "./sections/BentoGrid";
const App = () => {
  return (
    <main className="max-w-7xl mx-auto relative">
      <Navbar />
      <About /> 
      <BentoGrid />
    </main>
  );
};

export default App;
