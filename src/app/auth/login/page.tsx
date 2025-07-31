import LoadingIndicator from "@/components/LoadingIndicator";
import { Suspense } from "react";
import { LoginForm } from "../_components/LoginForm";

function LoginPage() {
  return (
    <Suspense fallback={<LoadingIndicator/>}>
      <LoginForm/>
    </Suspense>
  );
}

export default LoginPage;