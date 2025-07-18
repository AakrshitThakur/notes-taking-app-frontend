import React from "react";
import {
  CssBaseline,
  Box,
  Container,
  TextField,
  InputLabel,
  InputAdornment,
  IconButton,
  FilledInput,
  FormControl,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "@/utils/functions/formValidation";
import { errorToastify, successToastify } from "@/utils/functions/toastify";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // on-change function
  function handleOnChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // on-submit function
  async function handleOnSubmit(e) {
    e.preventDefault();
    setIsSubmitLoading(true);

    // Validating login using regular expressions
    const loginErrors = validateLoginForm(form);
    if (loginErrors.email || loginErrors.password) {
      setErrors(loginErrors);
      setIsSubmitLoading(false);
      return;
    }
    setErrors({});
    try {
      const response = await fetch("https://notes-taking-app-backend-d8ss.onrender.com/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.status !== 200) {
        errorToastify(data.msg);
        throw new Error(data.msg);
      }
      // Successfully gets result
      successToastify(data.msg);
      localStorage.setItem("user_id", `${data.user_id}`);
      navigate("/notes");
    } catch (error) {
      console.error(error.message);
      setIsSubmitLoading(false);
    }
  }

  return (
    <section id="Login" className="h-[75vh] grid items-center mt-2">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box
            className="light-text component-main-bg text-center p-4"
            component="div"
          >
            <form onSubmit={handleOnSubmit}>
              <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl leading-none">
                Login
              </h1>
              <div className="mb-2">
                <TextField
                  className="component-secondary-bg"
                  id="filled-basic"
                  label="Email"
                  variant="filled"
                  name="email"
                  value={form.email}
                  onChange={(e) => handleOnChange(e)}
                  sx={{
                    width: "65%",
                    "& .MuiInputBase-input": {
                      fontSize: {
                        xs: "0.675rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: {
                        xs: "0.675rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                    },
                  }}
                />
                {errors.email && (
                  <p className="leading-none text-xs sm:text-sm md:text-base">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <FormControl
                  className="component-secondary-bg"
                  sx={{
                    width: "65%",
                    "& .MuiInputLabel-root": {
                      fontSize: {
                        xs: "0.675rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: {
                        xs: "0.675rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: {
                        xs: "0.675rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                    },
                  }}
                  variant="filled"
                >
                  <InputLabel htmlFor="filled-adornment-password">
                    Password
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={(e) => handleOnChange(e)}
                    sx={{
                      fontSize: {
                        xs: "0.675rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {errors.password && (
                  <p className="leading-none text-xs sm:text-sm md:text-base">
                    {errors.password}
                  </p>
                )}
              </div>
              <div>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={isSubmitLoading}
                  sx={{
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.875rem",
                      md: "1rem",
                    },
                  }}
                >
                  {isSubmitLoading ? "Please wait..." : "Login"}
                </Button>
              </div>
            </form>
          </Box>
        </Container>
      </React.Fragment>
    </section>
  );
}
