import SvgAnimation from "./SvgAnimation"

const About = () => {
  return (
    <section className="c-space my-20">
      <div className="grid xl:grid-cols-4 h-full border border-black-300 transition delay-3 ease-in hover:shadow-[0px_0px_70px_2px_rgba(182,93,252,0.56)]
">
        <div className="col-span-2">
          <div className="grid-container1 object-contain ">
           <SvgAnimation />
          </div>
        </div>
        <div className="col-span-2 relative">
          <div className="grid-container1 relative">
            <img src="assets\erasebg-transformed.png" alt="grid-2" className="w-full h-[276] sm:h-[700] h-fit object-contain" />
              <p className="grid-headtext text-black">
                Unleash your inner creativity with WavStudio.<span className="text-purple">Learn, Sing, and Remix </span> — powered by AI that grooves with you.
              </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About