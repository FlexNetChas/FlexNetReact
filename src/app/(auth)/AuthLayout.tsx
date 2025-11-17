import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";

export function AuthLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Section spacing="none" className="flex items-center">
      <PageContainer size="sm" className="mb-10" padding="none">
        <div className="mx-auto mt-8 w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
          {children}
        </div>
      </PageContainer>
    </Section>
  );
}
