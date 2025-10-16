import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function SearchBar() {
  const { setQuery } = useContext(TaskContext);

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
