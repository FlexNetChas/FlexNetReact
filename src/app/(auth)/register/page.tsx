import { Metadata } from "next";

import { AuthLayout } from "../AuthLayout";
import RegisterForm from "./RegisterForm";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Flexnet account",
};

export default function RegisterPage() {
  return (
    <AuthLayout title="Create Account">
      <PageContainer padding="sm">
        <RegisterForm />
      </PageContainer>
    </AuthLayout>
  );
}
