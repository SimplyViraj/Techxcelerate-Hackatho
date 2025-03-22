import SvgAnimation from "./SvgAnimation"

const About = () => {
  return (
    <section className="c-space my-20">
      <div className="grid xl:grid-cols-3 gap-5 h-full">
        <div className="col-span-2 xl:row-span-1">
          <div className="grid-container relative ">
           <SvgAnimation />
          </div>
        </div>
        <div className="col-span-1 xl:row-span-1">
          <div className="grid-container">
            <img src="assets\artificial-intelligence-big-layout-illustration-with-hands-ai-robot-hand-generate-music-from-the-text-.jpg" alt="grid-2" className="w-full sm:h-[276] h-fit object-contain" />
            <div>
              <p className="grid-headtext">
                blah
              </p>
              <p className="grid-subtext">
                Blah
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About