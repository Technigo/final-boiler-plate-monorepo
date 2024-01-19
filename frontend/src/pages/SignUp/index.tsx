import { Suspense } from "react";
import { SignUpForm } from "../../features/user";
import { Spinner } from "../../ui/generic/Spinner";
import ErrorBoundary from "../../ui/generic/ErrorBoundary";

export const SignUp = () => {
  return (
    <div className="pt-20 md:min-h-screen flex  justify-center md:pt-44 pb-14 md:pb-0">
      <ErrorBoundary fallback={<p>Error</p>}>
        <Suspense fallback={<Spinner />}>
          <SignUpForm />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
