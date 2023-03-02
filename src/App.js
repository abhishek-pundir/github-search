import logo from "./logo.svg";
import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import RootLayout from "./layouts/RootLayout";
import Search from "./pages/Search";
import SearchResult from "./pages/SearchResult";
import UserProfile from "./pages/UserProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Search />} />
      <Route path="search" element={<SearchResult />} />
      <Route path="user/:username" element={<UserProfile />} />
    </Route>
  )
);

// Initialize query client
// stale time set to 60 seconds (Github by default support 1 minute caching)
const queryClient = new QueryClient({
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
