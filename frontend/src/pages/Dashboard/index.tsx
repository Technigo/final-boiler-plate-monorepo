import { Goals } from "../../features/dashboard";
import ErrorBoundary from "../../ui/generic/ErrorBoundary";

export const Dashboard = () => {
  return (
    <ErrorBoundary fallback={<p>Error</p>}>
      <section className="flex flex-col gap-12 section-layout">
        <Goals />
        {/* <Calendar />   Leave without calender for v1 */}
      </section>
    </ErrorBoundary>
  );
};
