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
  return (
    <Section
      spacing="lg"
      className="bg-secondary relative py-10 md:py-15 lg:py-20"
      id="reviews"
    >
      <PageContainer>
        {/* Article - Framer Motion Animation */}
        <div className="flex flex-col items-center justify-between md:grid md:grid-cols-[40%_1fr] lg:gap-16 xl:gap-20">
          <motion.article
            initial={{ opacity: 80, x: -40 }}
            whileInView={{ opacity: 100, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <h2 className="mb-8 text-center font-bold md:text-left">
              Our
              <span className="text-primary text-3xl underline decoration-1 underline-offset-4 lg:text-4xl xl:text-5xl">
                Reviews
              </span>
            </h2>

            <article className="mx-auto mb-4 space-y-6 text-center md:mx-0 md:text-left">
              <p className="text-muted-foreground leading-relaxed md:text-lg">
                &quot;This system gave me clear guidance and helped me plan my
                studies easily. Highly recommend!&quot;
              </p>
              <p className="text-muted-foreground leading-relaxed md:text-lg">
                &quot;Very intuitive and personalized. I could see different
                options and decide what was best for me.&quot;
              </p>
            </article>
          </motion.article>

          {/* Image - Framer Motion Animation */}
          <motion.div
            initial={{ opacity: 80, x: 40 }}
            whileInView={{ opacity: 100, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative mx-auto hidden h-75 w-2/3 overflow-hidden rounded-2xl md:block"
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

        {/* Review Cards - Framer Motion Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 100, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <Carousel
            className="relative w-full px-6 py-6"
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
              className="bg-background/50 absolute top-1/2 left-1 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full p-5"
            />

            <CarouselNext
              variant="default"
              className="bg-background/50 absolute top-1/2 right-1 z-10 translate-x-1/2 -translate-y-1/2 rounded-full p-5"
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
        <div className="inline-flex items-center gap-1 rounded-full bg-green-800 px-2 py-1">
          <span className="font-bold">{rating}</span>
          <Star className="size-4 text-yellow-600" />
        </div>

        <p className="mt-3 font-sans text-sm">{text}</p>

        <p className="text-muted-foreground mt-1 text-right text-sm font-semibold">
          - {author}
        </p>
      </CardContent>
    </Card>
  );
}
