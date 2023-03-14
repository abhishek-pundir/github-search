import { QueryClient, QueryClientProvider } from "react-query";

interface Props {
  children: React.ReactNode;
}

export const createWrapper = (retry = true) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry,
      },
    },
  });

  return ({ children }: Props) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
