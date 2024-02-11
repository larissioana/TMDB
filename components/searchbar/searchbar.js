import { useState, useRef, useEffect } from 'react'
import { Paper, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useRouter } from 'next/router';

const Searchbar = ({placeholder}) =>
{
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const inputRef = useRef(null);

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    if (searchTerm)
    {
      router.push(`/query/${searchTerm}`);
    }
  };

  const handleInputChange = (e) =>
  {
    setSearchTerm(e.target.value);
    const cursorPosition = e.target.selectionEnd;

      if (inputRef.current)
      {
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
  };

  return (
    <Paper
      component = "form"
      onSubmit = {handleSubmit}
      sx =
      {{
        borderBottom: "1px solid var(--white10)",
        borderRadius: 0,
        background: "transparent",
        mr: { sm : 4 },
        marginTop: "1.5rem"
      }}
    >
      <input 
        ref = {inputRef}
        className = "search-bar"
        placeholder = {placeholder}
        onChange = {handleInputChange}
        value = {searchTerm}
      />
      <IconButton
        type = "submit"
        sx = 
        {{
          p: "10px",
          color: "#fff",
        }}
      >
        <Search/>
      </IconButton>
    </Paper>
  )
};

export default Searchbar;
