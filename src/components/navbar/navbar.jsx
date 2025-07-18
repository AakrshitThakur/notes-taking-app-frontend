import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { errorToastify, successToastify } from "@/utils/functions/toastify";
import NotesSearch from "@/components/notes-search/notes-search";

export default function Navbar() {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("user_id");

  async function handleLogout() {
    try {
      const response = await fetch("https://notes-taking-app-backend-d8ss.onrender.com/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status !== 200) {
        errorToastify(data.msg);
        throw new Error(data.msg);
      }
      successToastify(data.msg);
      localStorage.removeItem("user_id");
      navigate("/login");
    } catch (error) {
      console.error(error.message);
      setIsSubmitLoading(false);
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <h2 onClick={() => navigate("/")} className="flex-1 text-lg md:text-xl lg:text-2xl leading-none cursor-pointer mr-1">
            Notes Taking App
          </h2>
          {isUserLoggedIn ? (
            <>
              <NotesSearch />
              <Button
                onClick={() => navigate("/notes/new")}
                sx={{
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.875rem",
                    md: "1rem",
                  },
                }}
                color="inherit"
              >
                New
              </Button>
              <Button
                onClick={handleLogout}
                sx={{
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.875rem",
                    md: "1rem",
                  },
                }}
                color="inherit"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/signup")}
                color="inherit"
                sx={{
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.875rem",
                    md: "1rem",
                  },
                }}
              >
                Signup
              </Button>
              <Button
                onClick={() => navigate("/login")}
                color="inherit"
                sx={{
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.875rem",
                    md: "1rem",
                  },
                }}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
