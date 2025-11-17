"use client";

import { Section } from "./layout/Section";
import { PageContainer } from "./layout/PageContainer";
import UspCards from "./UspCards";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const articleRef = useRef(null);
  const imageRef = useRef(null);

  const articleInView = useInView(articleRef, {
    margin: "-170px",
    amount: 0.2,
    once: typeof window !== "undefined" ? window.innerWidth < 768 : false,
  });

  const imageInView = useInView(imageRef, {
    margin: "-200px",
    amount: 0.2,
    once: typeof window !== "undefined" ? window.innerWidth < 768 : false,
  });

  return (
    <Section
      spacing="lg"
      className="bg-secondary relative py-10 md:py-15 lg:py-20"
    >
      <UspCards />

      <PageContainer className="mt-16 lg:mt-20">
        <div className="flex-col flex md:grid md:grid-cols-[1fr_40%] justify-between items-center lg:gap-16 xl:gap-20">
          {/* Image  */}
          {/* Framer Motion. Change duration to change animation speed */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -100 }}
            animate={
              imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
            }
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative hidden md:block overflow-hidden rounded-2xl shadow-xl h-96 w-2/3 mx-auto"
          >
            <Image
              src="/About.Logo.jpg"
              alt="Financial planning workspace"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Article */}
          {/* Framer Motion. Change duration to change animation speed */}
          <motion.article
            ref={articleRef}
            initial={{ opacity: 0, x: 100 }}
            animate={
              articleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
            }
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <h2 className="mb-8 text-center font-bold md:text-right">
              Our
              <span className="text-primary text-3xl underline decoration-1 underline-offset-4 lg:text-4xl xl:text-5xl">
                Story
              </span>
            </h2>

            <article className="mx-auto text-center md:text-right space-y-6 md:mx-0">
              <p className="text-muted-foreground leading-relaxed md:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                quia tempora ex corrupti inventore voluptate a sapiente magnam
              </p>
              <p className="text-muted-foreground leading-relaxed md:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                quia tempora ex corrupti inventore voluptate a sapiente magnam
              </p>
              <p className="text-primary leading-relaxed md:text-lg">
                Lorem, ipsum, and dolor.
              </p>
            </article>
          </motion.article>
        </div>
      </PageContainer>
    </Section>
  );
}
