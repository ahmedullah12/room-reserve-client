import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
