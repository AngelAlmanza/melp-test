import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "./ui/alert";
import { useUIContext } from "@/context/ui";
import { useEffect } from "react";

export const ShowErrorAlert = () => {
  const errorMessage = useUIContext(state => state.errorMsg);
  const setError = useUIContext(state => state.setErrorMsg);

  useEffect(() => {
    if (!errorMessage) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorMessage, setError]);

  if (!errorMessage) return null;

  return (
    <Alert variant="destructive" className="absolute bottom-2 right-2 z-10 w-fit">
      <AlertCircleIcon />
      <AlertTitle>{errorMessage}.</AlertTitle>
    </Alert>
  )
}