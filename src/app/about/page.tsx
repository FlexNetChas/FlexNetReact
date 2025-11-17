import About from "@/components/About";
import { Section } from "@/components/layout/Section";
import { PageContainer } from "@/components/layout/PageContainer";

export default function AboutPage() {
  return (
    <Section spacing="lg" className="bg-secondary relative py-10 md:py-15 lg:py-20">
      <PageContainer>
        <About />
      </PageContainer>
    </Section>
  );
}

