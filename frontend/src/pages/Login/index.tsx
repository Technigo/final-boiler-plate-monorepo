import { LoginForm } from "../../features/user";
import ErrorBoundary from "../../ui/generic/ErrorBoundary";

export const Login = () => {
  return (
    <div className="pt-20 md:min-h-screen flex  justify-center md:pt-44 pb-14 md:pb-0">
      <ErrorBoundary fallback={<p>Error</p>}>
        <LoginForm />
      </ErrorBoundary>
    </div>
  );
};
