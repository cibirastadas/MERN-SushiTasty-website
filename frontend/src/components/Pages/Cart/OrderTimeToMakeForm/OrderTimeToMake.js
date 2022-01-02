import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import classes from "./OrderTimeToMake.module.css";
import lt from "date-fns/locale/lt"; // the locale you want
import "react-datepicker/dist/react-datepicker.css";
import "./OrderTime.css";
import { timeToMake } from "../../../../helpers/timeToMake";
import { addDays, setHours, setMinutes } from "date-fns";
const OrderTimeToMake = ({
  isOpenCollapsible,
  values,
  handleChangeTime,
  errors,
}) => {
  registerLocale("lt", lt);
  let currentDate = new Date();
  const filterPassedTime = (time) => {
    const selectedDate = new Date(time);
    if (currentDate.getDay() !== selectedDate.getDay()) {
      return selectedDate;
    }
    if (
      selectedDate.getHours() >= currentDate.getHours() &&
      selectedDate.getTime() >= currentDate.getTime()
    ) {
      return selectedDate;
    }
  };
  return (
    <div className={classes.timeToMakeForm}>
      <div
        className={`${classes.content} ${
          isOpenCollapsible ? classes.open : ""
        }`}
      >
        <DatePicker
          required
          inline
          timeCaption="Laikas"
          locale="lt"
          mode="date"
          name="startDate"
          placeholderText="Pasirinkite norimą datą ir laiką"
          calendarClassName={classes.datePicker}
          selected={values.timeToMake}
          minDate={currentDate}
          maxDate={addDays(currentDate, 5)}
          minTime={setHours(setMinutes(currentDate, 0), 10)}
          maxTime={setHours(
            setMinutes(values.timeToMake, 45),
            values.timeToMake.getDay() <= 5 && values.timeToMake.getDay() !== 0
              ? 20
              : 21
          )}
          filterTime={filterPassedTime}
          showTimeSelect
          timeClassName={() => classes.timeDate}
          isClearable
          timeIntervals={15}
          onChange={(date) => handleChangeTime(date)}
          tabIndex={1}
        />
        {errors["timeToMake"] && values.timeToMake.getHours() === 0 ? (
          <p className={`error ${classes.error}`}>{errors["timeToMake"]}</p>
        ) : (
          values.timeToMake.getHours() !== 0 && (
            <p>Pagaminimo laikas: {timeToMake(values.timeToMake)}</p>
          )
        )}
      </div>
    </div>
  );
};

export default OrderTimeToMake;
