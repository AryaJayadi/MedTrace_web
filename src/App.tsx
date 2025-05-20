import { ApplicationRouter } from "@/core/ApplicationRouter.tsx";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <ApplicationRouter />
      <Toaster />
    </>
  );
}

export default App;
