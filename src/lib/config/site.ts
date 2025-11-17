export const siteConfig = {
  name: "FlexNet",
  title: "FlexNet! Your AI Study Guidance Companion",
  description:
    "FlexNet is a personalized AI avatar. Created to help you navigate your academic journey. From choosing the right path to achieving study goals, FlexNet is here to assist you every step of the way",
  url: process.env.NEXT_PUBLIC_DOMAIN_PAGE || "",
  keywords: [
    // Core product keywords
    "AI study companion",
    "personalized learning",
    "academic guidance",
    "study assistant",
    "educational AI",

    // Feature-focused keywords
    "AI tutor",
    "study planner",
    "academic advisor",
    "learning companion",
    "study goals",
    "educational guidance",

    // Target audience keywords
    "student assistance",
    "academic success",
    "study motivation",
    "learning journey",
    "educational support",

    // Technology keywords
    "AI education",
    "smart tutoring",
    "adaptive learning",
    "personalized education",

    // Problem/solution keywords
    "study help",
    "academic planning",
    "course selection",
    "career guidance",
    "educational path",

    // Brand and niche keywords
    "FlexNet AI",
    "digital study partner",
    "virtual academic advisor",
    "intelligent tutoring system",
  ] as string[],
  author: {
    name: "FlexNet Team",
    url: process.env.NEXT_PUBLIC_DOMAIN_PAGE || "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
