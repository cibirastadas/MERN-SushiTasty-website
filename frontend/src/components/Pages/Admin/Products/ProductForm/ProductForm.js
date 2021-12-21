import React from "react";
import Select from "../../../../Select/Select";
import classes from "./ProductForm.module.css";
const AddProduct = ({
  values,
  handleChange,
  sectionList,
  inputList,
  handleSelectedImg,
  styleUpdate,
  errors,
}) => {
  return (
    <div
      className={`${classes.formContainer} ${
        styleUpdate ? classes.updateContainer : ""
      }`}
    >
      <div className={classes.selections}>
        {sectionList.map((item) => {
          return (
            <Select
              style={classes.selection}
              key={item.id}
              values={values}
              data={item}
              handleChange={handleChange}
              errors={errors}
            />
          );
        })}
      </div>
      <div className={classes.inputsContainer}>
        {inputList.map((input) => {
          return (
            <div
              key={input.id}
              className={`${classes.inputParent} ${
                errors[input.value] && !errors[input.value]?.disabled
                  ? classes.marginBottom
                  : ""
              }`}
            >
              <div className={classes.inputBlock}>
                <p>{input.name}</p>
                <input
                  className={classes.input}
                  placeholder={input.placeholder}
                  value={values[input.value]}
                  type={input.type}
                  name={input.value}
                  onChange={handleChange}
                  {...(input.type === "number" && { min: "0" })}
                  disabled={
                    errors.category ? true : errors[input.value]?.disabled
                  }
                />
              </div>
              {errors[input.value] && !errors[input.value]?.disabled && (
                <p className={`error ${classes.error}`}>
                  {errors[input.value]}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <div className={classes.textareaContainer}>
          <textarea
            className={classes.description}
            name="description"
            value={values.description}
            placeholder="Čia peiteikite savo žinutę..."
            onChange={handleChange}
            disabled={errors.category}
          ></textarea>
        </div>
        {errors.description && (
          <p className={`error ${classes.error}`}>{errors.description}</p>
        )}
      </div>
      <div
        className={`${classes.images} ${
          errors.category ? classes.pointerEvents : ""
        }`}
      >
        <label>
          <input
            type="file"
            name="image"
            onChange={handleSelectedImg}
            className={classes.inputFile}
            disabled={errors.category}
            hidden
          />
          <div className={classes.uploadedImage}>
            {values.image && <img src={values.image} alt="" />}
            <span hidden={values.image}>Prideti</span>
          </div>
        </label>
        {errors.description && (
          <p className={`error ${classes.image}`}>{errors.image}</p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
