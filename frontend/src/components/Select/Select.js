import React from "react";
import classes from "./Select.module.css";
const Select = ({ data, handleChange, values, style, errors }) => {
  const isCategoy = "category" === data.name;
  return (
    <>
      <div className={`${classes.selection} ${style}`}>
        <p>{data.title}</p>
        <select
          name={data.name}
          value={values[data.name]}
          onChange={handleChange}
          disabled={isCategoy ? false : errors.category}
        >
          <option value="">-</option>
          {data.option.map((item, i) => {
            return (
              <option key={i} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </select>
        {isCategoy && errors.category && (
          <p className={`error ${classes.error}`}>{errors.category}</p>
        )}
      </div>
    </>
  );
};

export default Select;
