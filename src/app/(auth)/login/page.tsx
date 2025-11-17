import { Metadata } from "next";

import LoginForm from "./LoginForm";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthLayout } from "../AuthLayout";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your FlexNet account to continue your academic journey.",
};

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome Back" description="Sign in to continue">
      <PageContainer padding="sm">
        <LoginForm />
      </PageContainer>
    </AuthLayout>
  );
}
