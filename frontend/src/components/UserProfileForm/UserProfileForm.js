import React from "react";
import classes from "./UserProfileForm.module.css";
import { rolesData } from "../../data/rolesData";
const UserProfileForm = ({
  handleChange,
  values,
  createList,
  errors,
  workersRoles,
  isEdit,
  errorResponse,
}) => {
  return (
    <div className={classes.userProfileForm}>
      {errorResponse && <p className="error">{errorResponse}</p>}
      {createList?.length &&
        createList.map((input) => {
          if (!input.edit && isEdit) {
            return false;
          }
          return (
            <div className={classes.inputBlock} key={input.id}>
              <input
                placeholder={input.placeholder}
                name={input.name}
                type={input.type}
                value={values[input.name]}
                onChange={handleChange}
              />
              {errors[input.name] && (
                <p className="error">{errors[input.name]}</p>
              )}
            </div>
          );
        })}
      {workersRoles?.length && (
        <div className={classes.selectBlock}>
          <select
            name="role"
            value={values.role}
            onChange={handleChange}
            className={classes.role}
          >
            {workersRoles.map((role, index) => {
              return (
                <option key={index} value={role}>
                  {rolesData[role]}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </div>
  );
};

export default UserProfileForm;
