"use client";
import { useState, useEffect, Dispatch } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { registerUser } from "../../actions";
import CustomizedSnackbar from "@/app/(main)/components/SnackComponent";
import { redirect } from "next/navigation";
import { form } from "../components/FormDataInterface";

interface MailComponentProps {
  trigger: Dispatch<React.SetStateAction<boolean>>;
  formData: form;
}

export default function MailComponent({
  trigger,
  formData,
}: MailComponentProps) {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [errormessage, setErrMsg] = useState<string>("");

  const [authStatus, setAuthStatus] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const stop = count === 3;
  const variant = count === 2 ? "determinate" : "indeterminate";
  const [progress, setProgress] = useState<LinearProgressProps["value"]>(100);
  const progressValue = count === 2 ? progress : 0;

  /* Simulate sending link to email, set artificial timer */
  useEffect(() => {
    if (stop) {
      (async () => {
        console.log("Sending data: ", formData);
        const result = await registerUser(formData);
        if (result.success) {
          redirect("/dashboard");
        } else {
          setErrMsg(result.error.message);
          setSnackbarOpen(true);
          console.error(result.error);
        }
      })();
      return;
    } else {
      const interval = setInterval(() => {
        setCount((prevCount: number) => prevCount + 1);
      }, 750);
      return () => clearInterval(interval);
    }
  }, [formData, stop]);

  return (
    <Slide
      direction="left"
      in={authStatus}
      timeout={{
        enter: 300,
        exit: 300,
      }}
      mountOnEnter
      unmountOnExit
    >
      <Container
        maxWidth="xs"
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 4,
          p: 4,
          my: 10,
        }}
      >
        <Typography variant="h5" className="py-6">
          Confirm your mail. Please follow the link from your inbox.
        </Typography>
        <Typography variant="h6" className="py-6">
          Check the spam folder if needed.
        </Typography>
        <LinearProgress
          aria-label="Loading…"
          variant={variant}
          value={progressValue}
        />
        <CustomizedSnackbar
          open={snackbarOpen}
          message={errormessage}
          severity="error"
          onClose={() => setSnackbarOpen(false)}
        />
      </Container>
    </Slide>
  );
}
