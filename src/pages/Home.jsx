import About from "../sections/About"
import Navbar from "../sections/Navbar"
import BentoGrid from "../sections/BentoGrid"

export const Home = () => {
  return (
    <>
    <section className="c-space my-20 " id="about">
      <div className="grid xl:grid-cols-13 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        
        <div className="col-span-1">
            
        </div>
        <div className="col-span-12">
            <Navbar />
            <About />
            <BentoGrid />
            </div>
            </div>
            </section>
    </>
  )
}
