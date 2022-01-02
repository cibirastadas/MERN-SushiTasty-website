import React from "react";
import Button from "../../Buttons/ToggleButton/ToggleButton";
import classes from "./TablePagination.module.css";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
const TablePagination = ({
  paginationNavigation,
  gotoPage,
  previousPage,
  nextPage,
}) => {
  const { last, next, prev, first, current, total } = paginationNavigation;
  const handleChangePage = (e) => {
    const { value } = e.target;
    const pageNumber = value ? Number(value) - 1 : 0;
    gotoPage(pageNumber);
  };
  return (
    <div className={classes.pagination}>
      <span className={classes.separate}>Eiti į puslapį:</span>
      <input
        type="number"
        defaultValue={current?.page}
        min="1"
        max={total?.page}
        onChange={handleChangePage}
      />
      <span className={classes.minus}>
        <FiMinus />
      </span>
      <Button action={previousPage} disabled={!prev?.page}>
        <MdChevronLeft />
      </Button>
      {first?.page && (
        <>
          <Button action={() => gotoPage(0)}>{first.page}</Button>
          <span className={classes.minus}>
            <FiMinus />
          </span>
        </>
      )}
      {prev?.page && <Button action={previousPage}>{prev.page}</Button>}
      <Button style={classes.currentPage}>{current?.page}</Button>
      {next?.page && <Button action={nextPage}>{next.page}</Button>}
      {last?.page && (
        <>
          <span className={classes.minus}>
            <FiMinus />
          </span>
          <Button action={() => gotoPage(last.page - 1)}>{last.page}</Button>
        </>
      )}
      <Button action={nextPage} disabled={!next?.page}>
        <MdChevronRight />
      </Button>
    </div>
  );
};

export default TablePagination;
