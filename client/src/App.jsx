import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import Store from "./Store";
import Login from "./pages/Login";
import GlobalStyle from "./styles/GlobalStyle";
import ToasterContainer from "./ui/ToasterContainer";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import ProtectedRoute from "./pages/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/", element: <ProtectedRoute>
      <Chat />
    </ProtectedRoute>
  },
  { path: "*", element: <div>Not Found</div> },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyle />
        <RouterProvider router={router}></RouterProvider>
        <ToasterContainer />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
