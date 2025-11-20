"use client";

import { Section } from "@/components/layout/Section";
import { PageContainer } from "@/components/layout/PageContainer";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <Section
      spacing="lg"
      className="bg-secondary relative py-10 md:py-15 lg:py-20"
    >
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl"
        >
          <div className="mb-6 text-center">
            <h1 className="mb-6 text-3xl font-bold">
              Contact <span className="text-primary">Us</span>
            </h1>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-lg">
            <ContactForm />
          </div>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
