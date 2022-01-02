import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { BiSearch } from "react-icons/bi";
import classes from "./GlobalFilter.module.css";
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const handleChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 1000);
  return (
    <div className={classes.globalFilter}>
      <input
        className={classes.search}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          handleChange(e.target.value);
        }}
        placeholder={`Išviso rasta ${count}`}
      />
      <BiSearch className={classes.searchIcon} />
    </div>
  );
};

export default GlobalFilter;
