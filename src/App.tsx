import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import RootLayout from "./layouts/RootLayout";
import Search from "./pages/Search";
import SearchResult from "./pages/SearchResult";
import UserProfile from "./pages/UserProfile";

export const routeConfig = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Search />} />
    <Route path="search" element={<SearchResult />} />
    <Route path="user/:username" element={<UserProfile />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Route>
);

const router = createBrowserRouter(routeConfig);

// Initialize query client
// stale time set to 60 seconds (Github by default support 1 minute caching)
export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
