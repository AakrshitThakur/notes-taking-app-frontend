import { useState } from "react";
import { NotesSearchContext } from "./create-context";

export const NotesSearchProvider = ({ children }) => {
  const [notesSearch, setNotesSearch] = useState("");

  return (
    <NotesSearchContext.Provider value={{ notesSearch, setNotesSearch }}>
      {children}
    </NotesSearchContext.Provider>
  );
};
