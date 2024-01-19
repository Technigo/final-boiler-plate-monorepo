import { Deck } from "../../features/flashcards";
import { Suspense } from "react";
import { Spinner } from "../../ui/generic/Spinner";
import ErrorBoundary from "../../ui/generic/ErrorBoundary";

export const DeckPage = () => {
  return (
    <section className="section-layout">
      <ErrorBoundary fallback={<p>Error</p>}>
        <Suspense fallback={<Spinner />}>
          <Deck />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};
