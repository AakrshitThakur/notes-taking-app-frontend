import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { NotesSearchContext } from "@/contexts/notes-search/create-context";

export default function NotesSearch() {
  const [search, setSearch] = React.useState("");
  const {setNotesSearch } = React.useContext(NotesSearchContext);
  return (
    <Paper
      component="form"
      sx={{
        p: { xs: "2px 3px", sm: "4px 5px", md: "6px 10px" },
        display: "flex",
        alignItems: "center",
        height: "40px",
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
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search content"
        inputProps={{ "aria-label": "search-notes" }}
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
        aria-label="search"
      >
        <SearchIcon
          onClick={() => {
            setNotesSearch(search);
            setSearch("");
          }}
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
  );
}
