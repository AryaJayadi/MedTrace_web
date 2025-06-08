import { ApplicationRouter } from "@/core/ApplicationRouter.tsx";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <ApplicationRouter />
      <Toaster richColors />
    </>
  );
}

export default App;
