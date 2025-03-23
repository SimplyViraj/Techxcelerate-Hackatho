import { useState } from 'react';
import Globe from 'react-globe.gl';

import Button from '../components/Button.jsx';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('wavstudio@gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container border border-black-300 hover:inset-shadow-[0px_0px_40px_1px_rgba(182,93,252,0.36)]">
            <img src="assets/Frame.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext text">What we do in a Nutshell</p>
              <p className="grid-subtext">
              Practice, improve, and perfect your pitch with real-time guidance — all powered by friendly AI.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container  border border-black-300 ">
            <img src="assets/Frame (1).png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Your Beat. Your Voice.Reimagined </p>
              <p className="grid-subtext ">
              No studio? No problem. Turn any voice or beat into something dancefloor-ready with one click.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container  border border-black-300 ">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={450}
                width={450}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                enableZoom={false}
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 40, lng: -100, text: 'Rjieka, Croatia', color: 'white', size: 15 }]}
              />
            </div>
            <div>
              <p className="grid-headtext">We are very flexible with time zone communications & locations</p>
              <p className="grid-subtext">We are based in Andhra Pradesh,India and open to collaboration worldwide.</p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container  border border-black-300 ">
            <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code. Programming isn&apos;t just my
                profession—it&apos;s my passion. I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container  border border-black-300 ">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Customer Support?</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-oklch(0.438 0.218 303.724) text-black">wavstudion@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;