import React from "react";
import { Grid, Box, Stack, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { errorToastify, successToastify } from "@/utils/functions/toastify";
import { DisplayTagIcon } from "@/components/tag-icon/tag-icon";
import { NotesSearchContext } from "@/contexts/notes-search/create-context";

export default function Notes() {
  const navigate = useNavigate();
  const { notesSearch } = React.useContext(NotesSearchContext);
  console.log("rerenders");
  const [notes, setNotes] = React.useState({
    title: "",
    content: "",
    tags: [],
  });
  async function fetchAllNotes() {
    try {
      const response = await fetch("https://notes-taking-app-backend-d8ss.onrender.com/notes/", {
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
      setNotes(data.notes);
    } catch (error) {
      console.error(error.message);
    }
  }
  function checkFilterContent(content) {
    const check = content
      .toLowerCase()
      .trim()
      .includes(notesSearch.toLowerCase().trim());
    return check;
  }
  React.useEffect(function () {
    fetchAllNotes();
  }, []);

  async function deleteNote(id) {
    try {
      const response = await fetch(`https://notes-taking-app-backend-d8ss.onrender.com/notes/${id}/delete`, {
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
      fetchAllNotes();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <section id="notes" className="mt-2 p-2">
      {notes.length > 0 ? (
        <Grid container spacing={2}>
          {notes.map((n) => (
            <React.Fragment key={n._id}>
              {checkFilterContent(n.content) && (
                <Grid key={n._id} item size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box className="component-main-bg text-white cursor-pointer p-2">
                    <h2 className="text-xl md:text-2xl lg:text-3xl leading-none mb-2">
                      {n.title}
                    </h2>
                    {/* <Divider sx={{backgroundColor: "white"}} /> */}
                    <p className="text-xs sm:text-sm md:text-base leading-none break-words mb-2">
                      {n.content}
                    </p>
                    {/* <Divider sx={{backgroundColor: "white"}} /> */}
                    <div className="mb-2">
                      <Stack direction="row" spacing={1}>
                        {n.tags.map((t) => (
                          <DisplayTagIcon key={t.id} tagString={t.tagString} />
                        ))}
                      </Stack>
                    </div>
                    <div>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                      >
                        <Button
                          onClick={() => navigate(`/notes/${n._id}`)}
                          sx={{
                            backgroundColor: "white",
                            fontSize: {
                              xs: "0.75rem",
                              sm: "0.875rem",
                              md: "1rem",
                            },
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => deleteNote(n._id)}
                          startIcon={<DeleteIcon />}
                          sx={{
                            backgroundColor: "white",
                            fontSize: {
                              xs: "0.75rem",
                              sm: "0.875rem",
                              md: "1rem",
                            },
                          }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </div>
                  </Box>
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      ) : (
        <p className="text-xs sm:text-sm md-text-base leading-none">
          Kindly wait while all the notes are being retrieved
        </p>
      )}
    </section>
  );
}
