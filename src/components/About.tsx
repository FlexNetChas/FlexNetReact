"use client";

import { Section } from "./layout/Section";
import { PageContainer } from "./layout/PageContainer";
import UspCards from "./UspCards";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <Section
      id="our-story"
      spacing="lg"
      className="bg-secondary relative py-10 md:py-15 lg:py-20"
    >
      <UspCards />

      <PageContainer className="mt-16 lg:mt-20">
        <div className="flex-col flex md:grid md:grid-cols-[1fr_40%] justify-between items-center lg:gap-16 xl:gap-20">
          {/* Image - Framer Motion Animation */}
          <motion.div
            initial={{ opacity: 80, x: -40 }}
            whileInView={{ opacity: 100, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative hidden md:block overflow-hidden rounded-2xl shadow-xl h-96 w-2/3 mx-auto"
          >
            <Image
              src="/About.Logo.jpg"
              alt="FlexNet About Us Logo"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Article - Framer Motion Animation */}
          <motion.article
            initial={{ opacity: 80, x: 40 }}
            whileInView={{ opacity: 100, x: 0 }}
            viewport={{ once: false }}
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
