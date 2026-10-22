"use client";
import {
  useState,
  useRef,
  useId,
  ChangeEvent,
  SubmitEvent,
  MouseEvent,
} from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { blueGrey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import logo from "/public/EVENT logo.svg";
import Slide from "@mui/material/Slide";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import SupportIcon from "@mui/icons-material/Support";
import Divider from "@mui/material/Divider";
import { redirect } from "next/navigation";

const theme = createTheme({
  palette: {
    background: {
      default: blueGrey["A100"],
    },
  },
});

export default function UserForm() {
  const outlinedPasswordId = useId();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loginButton, setLoginButton] = useState<boolean>(true);
  const [slide, setSlide] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (inputRef.current) {
      setLoginButton(!inputRef.current.checkValidity());
    }
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setLoginButton(true);
    setSlide(false);
    redirect("/dashboard");
  };

  function handleRedirect() {
    setLoginButton(true);
    setSlide(false);
    redirect("/register");
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Slide
        direction="right"
        in={slide}
        timeout={{
          enter: 0,
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
            my: { sm: 2.5, md: 4, lg: 5 },
          }}
        >
          <Box
            component="form"
            ref={inputRef}
            onSubmit={handleSubmit}
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Image
              src={logo}
              sizes="100vw"
              alt="EVENT Company logo"
              style={{
                objectFit: "cover",
                margin: "auto",
                width: "100%",
                height: "auto",
              }}
              loading="eager"
            />
            <Typography variant="h5">Intra in cont</Typography>
            <FormGroup>
              <Box
                sx={{
                  justifyContent: "center",
                  "& > .MuiFormControl-root": { py: 1 },
                }}
              >
                <FormControl fullWidth>
                  <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                  <InputLabel required htmlFor={`${outlinedPasswordId}-input`}>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id={`${outlinedPasswordId}-input`}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    handleRedirect();
                  }}
                >
                  Inregistrare
                </Link>
              </Box>
            </FormGroup>
            <Divider sx={{ width: "100%" }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minWidth: "100",
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert("Reset password")}
                startIcon={<SupportIcon />}
              >
                Reset password
              </Button>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loginButton}
            >
              Logare
            </Button>
            <Typography variant="caption">
              <Link href="#">EVENT Terms of Service</Link>
              <br />
              <Link href="#">EVENT Privacy Statement</Link>
            </Typography>
          </Box>
        </Container>
      </Slide>
    </ThemeProvider>
  );
}
