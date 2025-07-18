import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TagIcon({ tag, deleteTag }) {
  return (
    <Chip
      sx={{
        "& .MuiChip-label": {
          color: "white",
        },
      }}
      label={tag.tagString}
      onDelete={() => deleteTag(tag.id)}
      deleteIcon={<DeleteIcon />}
      variant="outlined"
    />
  );
}

export function DisplayTagIcon({ tagString }) {
  return (
    <Chip
      sx={{
        "& .MuiChip-label": {
          color: "white",
        },
      }}
      label={tagString}
      variant="outlined"
    />
  );
}
