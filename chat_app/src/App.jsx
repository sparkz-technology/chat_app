import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./pages/Login";
import GlobalStyle from "./styles/GlobalStyle";
import ToasterContainer from "./ui/ToasterContainer";
import Signup from "./pages/Signup";
import Users from "./features/chat/Users";
import Chat from "./pages/Chat";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/s", element: <Users /> },
  { path: "/chat", element: <Chat /> },
  { path: "*", element: <div>Not Found</div> },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
      <ToasterContainer />
    </QueryClientProvider>
  );
}

export default App;
