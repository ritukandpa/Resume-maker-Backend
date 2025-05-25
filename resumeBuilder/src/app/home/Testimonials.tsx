"use client";
import heartSrc from "public/assets/heart.svg";
import testimonialSpiegelSrc from "public/assets/testimonial-spiegel.jpg";
import testimonialSantiSrc from "public/assets/testimonial-santi.jpg";
import testimonialVivianSrc from "public/assets/testimonial-vivian.jpg";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTailwindBreakpoints } from "lib/hooks/useTailwindBreakpoints";

const TESTIMONIALS = [
  {
    src: testimonialSpiegelSrc,
    quote:
      "I used Resume Builder during my last job search and secured interviews at top tech companies, thanks to its sleek yet professional resume design. Now, as a successful Cloud Engineer, I apply the same precision and organization to building scalable cloud solutions.",
    name: "Anshul Chauhan",
    title: "Cloud Engineer",
  },
  {
    src: testimonialSantiSrc,
    quote:
      "I used Resume Builder during my last job search and landed opportunities with top modeling agencies, thanks to its sleek yet professional resume design. Now, as a successful fashion model, I continue to apply the same attention to detail and presentation in my career.",
    name: "Simran Jyala",
    title: "Model",
  },
  {
    src: testimonialVivianSrc,
    quote:
      "Creating a professional resume on Resume Builder is so smooth and easy! It saves me so much time and headache to not deal with google doc template.",
    name: "Ayush Kothari",
    title: "Software Engineer",
  },
];

const LG_TESTIMONIALS_CLASSNAMES = [
  "z-10",
  "translate-x-44 translate-y-24 opacity-40",
  "translate-x-32 -translate-y-28 opacity-40",
];
const SM_TESTIMONIALS_CLASSNAMES = ["z-10", "opacity-0", "opacity-0"];
const ROTATION_INTERVAL_MS = 8 * 1000; // 8s

export const Testimonials = ({ children }: { children?: React.ReactNode }) => {
  const [testimonialsClassNames, setTestimonialsClassNames] = useState(
    LG_TESTIMONIALS_CLASSNAMES
  );
  const isHoveredOnTestimonial = useRef(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHoveredOnTestimonial.current) {
        setTestimonialsClassNames((preClassNames) => {
          return [preClassNames[1], preClassNames[2], preClassNames[0]];
        });
      }
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  const { isLg } = useTailwindBreakpoints();
  useEffect(() => {
    setTestimonialsClassNames(
      isLg ? LG_TESTIMONIALS_CLASSNAMES : SM_TESTIMONIALS_CLASSNAMES
    );
  }, [isLg]);

  return (
    <section className="mx-auto -mt-2 px-8 pb-24">
      <h2 className="mb-8 text-center text-3xl font-bold">
        People{" "}
        <Image src={heartSrc} alt="love" className="-mt-1 inline-block w-7" />{" "}
        Resume Builder
      </h2>
      <div className="mx-auto mt-10 h-[235px] max-w-lg lg:h-[400px] lg:pt-28">
        <div className="relative lg:ml-[-50px]">
          {TESTIMONIALS.map(({ src, quote, name, title }, idx) => {
            const className = testimonialsClassNames[idx];
            return (
              <div
                key={idx}
                className={`bg-primary absolute max-w-lg rounded-[1.7rem] bg-opacity-30 shadow-md transition-all duration-1000 ease-linear ${className}`}
                onMouseEnter={() => {
                  if (className === "z-10") {
                    isHoveredOnTestimonial.current = true;
                  }
                }}
                onMouseLeave={() => {
                  if (className === "z-10") {
                    isHoveredOnTestimonial.current = false;
                  }
                }}
              >
                <figure className="m-1 flex gap-5 rounded-3xl bg-white p-5 text-gray-900 lg:p-7">
                  <Image
                    className="hidden h-24 w-24 select-none rounded-full lg:block"
                    src={src}
                    alt="profile"
                  />
                  <div>
                    <blockquote>
                      <p className="before:content-['“'] after:content-['”']">
                        {quote}
                      </p>
                    </blockquote>
                    <figcaption className="mt-3">
                      <div className="hidden gap-2 lg:flex">
                        <div className="font-semibold">{name}</div>
                        <div
                          className="select-none text-gray-700"
                          aria-hidden="true"
                        >
                          •
                        </div>
                        <div className="text-gray-600">{title}</div>
                      </div>
                      <div className="flex gap-4 lg:hidden">
                        <Image
                          className=" block h-12 w-12 select-none rounded-full"
                          src={src}
                          alt="profile"
                        />
                        <div>
                          <div className="font-semibold">{name}</div>
                          <div className="text-gray-600">{title}</div>
                        </div>
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </div>
            );
          })}
        </div>
      </div>
      {children}
    </section>
  );
};
