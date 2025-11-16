"use client";

import { Section } from "./layout/Section";
import { PageContainer } from "./layout/PageContainer";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const reviews = [
  {
    rating: 4,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aut nam saepe voluptatum eum omnis quisquam accusamus.",
    author: "Tolvan Tolvansson",
  },
  {
    rating: 4.5,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aut nam saepe voluptatum eum omnis quisquam accusamus.",
    author: "Tolvan Tolvansson",
  },
  {
    rating: 4,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aut nam saepe voluptatum eum omnis quisquam accusamus.",
    author: "Tolvan Tolvansson",
  },
  {
    rating: 5,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aut nam saepe voluptatum eum omnis quisquam accusamus.",
    author: "Tolvan Tolvansson",
  },
];

type Review = {
  rating: number;
  text: string;
  author: string;
};

export default function Reviews() {
  const articleRef = useRef(null);
  const imageRef = useRef(null);
  const carouselRef = useRef(null);

  // Framer Motion. Change margin to trigger an erlier effect
  const articleInView = useInView(articleRef, {
    margin: "-200px",
    amount: 0.2,
    once: typeof window !== "undefined" ? window.innerWidth < 768 : false,
  });

  const imageInView = useInView(imageRef, {
    margin: "-200px",
    amount: 0.2,
    once: typeof window !== "undefined" ? window.innerWidth < 768 : false,
  });

  const carouselInView = useInView(carouselRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <Section
      spacing="lg"
      className="bg-secondary relative py-10 md:py-15 lg:py-20"
    >
      <PageContainer>
        {/* Article  */}
        <div className="flex-col flex md:grid md:grid-cols-[40%_1fr] justify-between items-center lg:gap-16 xl:gap-20">
          {/* Framer Motion. Change duration to change animation speed */}
          <motion.article
            ref={articleRef}
            initial={{ opacity: 0, x: -100 }}
            animate={articleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <h2 className="mb-8 text-center font-bold md:text-left">
              Our
              <span className="text-primary text-3xl underline decoration-1 underline-offset-4 lg:text-4xl xl:text-5xl">
                Reviews
              </span>
            </h2>

            <article className="mx-auto space-y-6 md:mx-0 mb-4 text-center md:text-left">
              <p className="text-muted-foreground leading-relaxed md:text-lg">
                "This system gave me clear guidance and helped me plan my
                studies easily. Highly recommend!"
              </p>
              <p className="text-muted-foreground leading-relaxed md:text-lg">
                "Very intuitive and personalized. I could see different options
                and decide what was best for me."
              </p>
            </article>
          </motion.article>

          {/* Image */}
          {/* Framer Motion. Change duration to change animation speed */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 100 }}
            animate={imageInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
            className="relative aspect-square w-1/2 max-w-[150px] mx-auto overflow-hidden rounded-2xl md:aspect-video md:w-full md:max-w-xs"
          >
            <Image
              src="/feedback.png"
              alt="Student reviews"
              fill
              priority
              sizes="(max-width: 768px) 150px, 384px"
            />
          </motion.div>
        </div>

        {/* Review Cards */}
        {/* Framer Motion. Change duration to change animation speed */}
        <motion.div
          ref={carouselRef}
          initial={{ opacity: 0, y: 50 }}
          animate={carouselInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
        >
          <Carousel
            className="relative w-full py-6 px-6"
            opts={{ align: "start" }}
          >
            <CarouselContent>
              {reviews.map((r, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <ReviewCard
                      rating={r.rating}
                      text={r.text}
                      author={r.author}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              variant="default"
              className="absolute left-1 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 p-5 bg-background/50 rounded-full "
            />

            <CarouselNext
              variant="default"
              className="absolute right-1 translate-x-1/2 top-1/2 -translate-y-1/2 z-10 p-5 bg-background/50 rounded-full "
            />
          </Carousel>
        </motion.div>
      </PageContainer>
    </Section>
  );
}

function ReviewCard({ rating, text, author }: Review) {
  return (
    <Card className="review-card linear-card-gradient">
      <CardContent className="p-0">
        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-800">
          <span className="font-bold">{rating}</span>
          <Star className="size-4 text-yellow-600" />
        </div>

        <p className="mt-3">{text}</p>

        <p className="text-muted-foreground font-semibold text-sm mt-1 text-right">
          - {author}
        </p>
      </CardContent>
    </Card>
  );
}
