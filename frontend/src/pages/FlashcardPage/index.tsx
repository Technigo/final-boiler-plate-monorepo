import { Suspense } from "react";
import { FlashcardsBoard } from "../../features/flashcards";
import { Spinner } from "../../ui/generic/Spinner";
import ErrorBoundary from "../../ui/generic/ErrorBoundary";

export const FlashcardPage = () => {
  return (
    <section className="section-layout justify-start">
      <ErrorBoundary fallback={<p>Error</p>}>
        <Suspense fallback={<Spinner />}>
          <FlashcardsBoard />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};
