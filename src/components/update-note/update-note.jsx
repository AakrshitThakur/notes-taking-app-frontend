import React from "react";
import {
  CssBaseline,
  Box,
  Container,
  TextField,
  Button,
  Paper,
  InputBase,
  IconButton,
  Stack,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { errorToastify, successToastify } from "@/utils/functions/toastify";
import TagIcon from "@/components/tag-icon/tag-icon";
import generateUniqueId from "generate-unique-id";

export default function CreateNote() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [note, setNote] = React.useState({
    title: "",
    content: "",
    tags: [],
    tagString: "",
  });
  React.useEffect(function () {
    async function fetchAllNotes() {
      try {
        const response = await fetch(`https://notes-taking-app-backend-d8ss.onrender.com/notes/${id}`, {
          method: "GET",
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
        setNote({ ...data.note, tagString: "" });
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchAllNotes();
  }, []);

  // on-change function
  function handleOnChange(e) {
    setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // on-submit function
  async function handleOnSubmit(e) {
    e.preventDefault();
    setIsSubmitLoading(true);

    // Validating empty fields
    if (!note.title) {
      setErrors((prev) => ({ ...prev, title: "Title field cannot be empty" }));
      setIsSubmitLoading(false);
      return;
    }
    if (!note.content) {
      setErrors((prev) => ({
        ...prev,
        content: "Content field cannot be empty",
      }));
      setIsSubmitLoading(false);
      return;
    }
    setErrors({});
    try {
      const response = await fetch(`https://notes-taking-app-backend-d8ss.onrender.com/notes/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      const data = await response.json();
      if (data.status !== 200) {
        errorToastify(data.msg);
        throw new Error(data.msg);
      }
      successToastify(data.msg);
      localStorage.setItem("user_id", `${data.user_id}`);
      navigate("/notes");
    } catch (error) {
      console.error(error.message);
      setIsSubmitLoading(false);
    }
  }

  function addNewTag() {
    setNote((prev) => ({
      ...prev,
      tags: [
        ...note.tags,
        { tagString: note.tagString, id: generateUniqueId() },
      ],
      tagString: "",
    }));
  }
  function deleteTag(id) {
    setNote((prev) => ({
      ...prev,
      tags: note.tags.filter((t) => t.id !== id),
    }));
  }

  return (
    <section id="create-note" className="h-[75vh] grid items-center mt-2">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box
            className="light-text component-main-bg text-center p-4"
            component="div"
          >
            <form onSubmit={handleOnSubmit}>
              <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl leading-none">
                Create Note
              </h1>
              <div className="mb-2">
                <TextField
                  className="component-secondary-bg"
                  id="filled-basic"
                  label="Title"
                  variant="filled"
                  name="title"
                  value={note.title}
                  onChange={(e) => handleOnChange(e)}
                  sx={{
                    width: "65%",
                    "& .MuiInputBase-input": {
                      lineHeight: {
                        xs: "1",
                        sm: "1.1",
                      },
                      fontSize: {
                        xs: "0.675rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      lineHeight: {
                        xs: "1",
                        sm: "1.1",
                      },
                      fontSize: {
                        xs: "0.675rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                    },
                  }}
                />
                {errors.title && (
                  <p className="leading-none text-xs sm:text-sm md:text-base">
                    {errors.title}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <TextField
                  className="component-secondary-bg"
                  id="filled-multiline-static"
                  label="Content"
                  variant="filled"
                  name="content"
                  value={note.content}
                  rows={4}
                  multiline
                  onChange={(e) => handleOnChange(e)}
                  sx={{
                    width: "65%",
                    "& .MuiInputBase-input": {
                      lineHeight: {
                        xs: "1",
                        sm: "1.1",
                      },
                      fontSize: {
                        xs: "0.675rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      lineHeight: {
                        xs: "1",
                        sm: "1.1",
                      },
                      fontSize: {
                        xs: "0.675rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                    },
                  }}
                />
                {errors.content && (
                  <p className="leading-none text-xs sm:text-sm md:text-base">
                    {errors.content}
                  </p>
                )}
              </div>
              <div className="flex justify-center items-center mb-2">
                <Paper
                  component="div"
                  sx={{
                    p: { xs: "4px 6px", sm: "6px 8px", md: "8px 12px" },
                    display: "flex",
                    alignItems: "center",
                    width: "65%",
                  }}
                >
                  <InputBase
                    sx={{
                      ml: 1,
                      flex: 1,
                      lineHeight: {
                        xs: "1",
                        sm: "1.1",
                      },
                      fontSize: {
                        xs: "0.675rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                    }}
                    placeholder="Add a tag"
                    name="tagString"
                    value={note.tagString}
                    onChange={handleOnChange}
                    inputProps={{ "aria-label": "Add a tag" }}
                  />
                  <IconButton
                    type="button"
                    sx={{
                      p: {
                        xs: "6px",
                        sm: "8px",
                        md: "10px",
                      },
                    }}
                    aria-label="add-button"
                  >
                    <AddCircleOutlineIcon
                      onClick={addNewTag}
                      sx={{
                        fontSize: {
                          xs: "0.875rem",
                          sm: "1rem",
                          md: "1.275rem",
                        },
                      }}
                    />
                  </IconButton>
                </Paper>
              </div>
              <div className="mb-2">
                <Stack direction="row" spacing={1}>
                  {note.tags.map((t) => (
                    <TagIcon key={t.id} tag={t} deleteTag={deleteTag} />
                  ))}
                </Stack>
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={isSubmitLoading}
                  sx={{
                    backgroundColor: "white",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.875rem",
                      md: "1rem",
                    },
                  }}
                >
                  {isSubmitLoading ? "Please wait..." : "Update"}
                </Button>
              </div>
            </form>
          </Box>
        </Container>
      </React.Fragment>
    </section>
  );
}
