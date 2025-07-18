import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/navbar/navbar.jsx";
import Login from "@/components/login/login.jsx";
import Signup from "@/components/signup/signup.jsx";
import Notes from "@/components/notes/notes.jsx";
import CreateNote from "@/components/create-note/create-note.jsx";
import UpdateNote from "@/components/update-note/update-note.jsx";
import AuthProtected from "@/wrappers/auth-protected.jsx";
import { NotesSearchProvider } from "@/contexts/notes-search/provider";
import "./App.css";

function App() {
  return (
    <div id="app">
      <NotesSearchProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/notes"
              element={
                <AuthProtected>
                  <Notes />
                </AuthProtected>
              }
            />
            <Route
              path="/notes/new"
              element={
                <AuthProtected>
                  <CreateNote />
                </AuthProtected>
              }
            />
            <Route
              path="/notes/:id"
              element={
                <AuthProtected>
                  <UpdateNote />
                </AuthProtected>
              }
            />
            <Route
              path="/"
              element={
                <AuthProtected>
                  <Notes />
                </AuthProtected>
              }
            />
          </Routes>
        </BrowserRouter>
      </NotesSearchProvider>
    </div>
  );
}

export default App;
