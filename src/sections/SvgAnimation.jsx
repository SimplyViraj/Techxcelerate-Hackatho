import { useEffect, useRef } from "react";
import gsap from "gsap";

const SvgAnimation = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const tl = gsap.timeline({ defaults: { duration: 2, yoyo: true, ease: "power2.inOut" } });

    tl.fromTo(
      [".left", ".right"],
      { transformOrigin: "50% 50%", skewY: (i) => [-10, 5][i], scaleX: (i) => [0.9, 1][i], x: 50 },
      { skewY: (i) => [-5, 10][i], scaleX: (i) => [1, 0.9][i], x: -50 }
    ).play(0.5);

    const tl2 = gsap.timeline();
    const texts = svgRef.current.querySelectorAll("text");

    texts.forEach((t, i) => {
      tl2.add(
        gsap.fromTo(
          t,
          { opacity: 0, x: 100 },
          { duration: 1, opacity: 1, x: 0, ease: "sine.inOut" }
        ),
        (i % 4) * 0.2
      );
    });

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
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      <svg
        ref={svgRef}
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid meet"
        className="w-[100%] max-w-full"
      >
        <defs>
          <mask id="maskLeft">
            <rect x="0" y="0" width="50.05%" height="100%" fill="white" />
          </mask>
          <mask id="maskRight">
            <rect x="49.8%" y="0" width="50.05%" height="100%" fill="white" />
          </mask>
        </defs>

        <g fontSize="6vw" fontWeight="bold" fontFamily="Arial]">
          <g mask="url(#maskLeft)" fill="purple" className="left">
            {["REMIX", "LIKE", "NEVER", "BEFORE"].map((word, i) => (
              <text key={i} x="50%" y={`${30 + i * 20}%`} textAnchor="middle" dominantBaseline="middle">
                {word}
              </text>
            ))}
          </g>

          <g mask="url(#maskRight)" fill="gray" className="right">
            {["REMIX", "LIKE", "NEVER", "BEFORE"].map((word, i) => (
              <text key={i} x="50%" y={`${30 + i * 20}%`} textAnchor="middle" dominantBaseline="middle" fill="purple">
                {word}
              </text>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default SvgAnimation;
<div className="magicpattern absolute top-0 left-0 w-full h-full z-10"></div>