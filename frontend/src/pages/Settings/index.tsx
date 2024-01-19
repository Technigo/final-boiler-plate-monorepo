import { Suspense } from "react";
import { Spinner } from "../../ui/generic/Spinner";
import { SettingsPage } from "../../features/settings";
import ErrorBoundary from "../../ui/generic/ErrorBoundary";
import { Error } from "../../ui/generic/Error";

export const Settings = () => {
  return (
    <section className="mt-6">
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner />}>
          <SettingsPage />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};
