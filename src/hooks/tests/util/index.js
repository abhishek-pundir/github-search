import { QueryClient, QueryClientProvider } from "react-query";

export const createWrapper = (retry = true) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry,
      },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
