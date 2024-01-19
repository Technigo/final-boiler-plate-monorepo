import { ReactNode } from "react";

export const ContentFrame = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center w-full px-2 py-3 md:p-6 lg:p-8 rounded-lg ">
      {children}
    </div>
  );
};
