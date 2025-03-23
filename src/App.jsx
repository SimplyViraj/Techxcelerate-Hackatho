import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Remix from "./pages/Remix";

 // Import the Remix component

const App = () => {
  return (
    <BrowserRouter>
      <main className="max-w-7xl mx-auto relative">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/remix" element={<Remix />} /> 
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
