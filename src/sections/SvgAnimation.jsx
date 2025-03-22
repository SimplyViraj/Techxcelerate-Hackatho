import { useEffect, useRef } from "react";
import gsap from "gsap";

const SvgAnimation = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        yoyo: true,
        ease: "power2.inOut",
      },
    });

    tl.fromTo(
      [".left", ".right"],
      {
        svgOrigin: "640 500",
        skewY: (i) => [-30, 15][i],
        scaleX: (i) => [0.6, 0.85][i],
        x: 200,
      },
      {
        skewY: (i) => [-15, 30][i],
        scaleX: (i) => [0.85, 0.6][i],
        x: -200,
      }
    ).play(0.5);

    // Timeline for individual text movement
    const tl2 = gsap.timeline();
    const texts = svgRef.current?.querySelectorAll("text") || [];
    texts.forEach((t, i) => {
      tl2.add(
        gsap.fromTo(
          t,
          { xPercent: -100, x: 700 },
          { duration: 1, xPercent: 0, x: 575, ease: "sine.inOut" }
        ),
        (i % 4) * 0.2
      );
    });

    // Pointer-based animation control
    const handlePointerMove = (e) => {
      tl.pause();
      tl2.pause();
      gsap.to([tl, tl2], {
        duration: 2,
        ease: "power4",
        progress: e.x / window.innerWidth,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Pattern */}
      <div className="magicpattern absolute top-0 left-0 z-0"></div>

      {/* SVG Animation */}
      <div className="relative top-10 left-5 z-10">
        <svg ref={svgRef} viewBox="0 0 1280 720" className="w- h-auto">
          {/* Left Mask */}
          <mask id="maskLeft">
            <rect x="-50%" width="100%" height="100%" fill="#fff" />
          </mask>

          {/* Right Mask */}
          <mask id="maskRight">
            <rect x="50%" width="100%" height="100%" fill="#fff" />
          </mask>

          {/* Text Groups */}
          <g fontSize="150">
            {/* Left (Black) */}
            <g mask="url(#maskLeft)" fill="#000" className="left">
              <text y="120">REMIX</text>
              <text y="250">LIKE</text>
              <text y="380">NEVER</text>
              <text y="510">Before</text>
            </g>

            {/* Right (Gray) */}
            <g mask="url(#maskRight)" fill="#888" className="right">
              <text y="120">REMIX</text>
              <text y="250">LIKE</text>
              <text y="380">NEVER</text>
              <text y="510">Before</text>
            </g>
          </g>
        </svg>
      </div>

      {/* Second Background Pattern */}
      <div className="magicpattern2 absolute bottom-0 right-60 z-0"></div>
    </div>
  );
};

export default SvgAnimation;
