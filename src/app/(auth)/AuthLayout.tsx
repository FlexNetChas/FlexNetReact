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
    <Section
      spacing="none"
      className="flex min-h-[calc(100vh-100px)] items-start pt-8"
    >
      <PageContainer size="sm" className="w-full" padding="none">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
          {children}
        </div>
      </PageContainer>
    </Section>
  );
}
