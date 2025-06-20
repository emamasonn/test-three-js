"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import Image from "next/image";
import Link from "next/link";

// Register the plugin
gsap.registerPlugin(CSSRulePlugin);

export default function AnimatedContent() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const content = CSSRulePlugin.getRule(".content:before");
      const h1 = h1Ref.current;
      const p = pRef.current;

      if (content && h1 && p) {
        const tl = gsap.timeline();

        tl.from(content, {
          delay: 0.5,
          duration: 4,
          cssRule: { scaleX: 0 },
        });
        tl.to(h1, {
          duration: 3,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        });
        tl.to(p, {
          duration: 6,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        });
      }
    }
  }, []);

  return (
    <div className="container">
      <Link href="/lab" className="lab-link">
        Lab
        <Image width={15} height={15} alt="lab" src="/assets/lab.png" />
      </Link>
      <div className="content">
        <h1 ref={h1Ref}>
          Front-End Developer
          <br />
          David E. Mason
        </h1>
        <p ref={pRef}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio officia,
          est animi optio.
        </p>
      </div>
    </div>
  );
}
