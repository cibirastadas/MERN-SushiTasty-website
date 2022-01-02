import React from "react";
import Button from "../Buttons/ToggleButton/ToggleButton";
import { useHistory } from "react-router-dom";
import classes from "./Pagination.module.css";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
const Pagination = ({ paginationNavigation,  }) => {
  const { last, next, prev, first, current } = paginationNavigation;
  const history = useHistory();
  const handlePaginationAction = (page) => {
    history.replace({
      pathname: history.location.pathname,
      search: `?page=${page}`,
    });
  };
  return (
    <div className={classes.pagination}>
      <Button
        action={handlePaginationAction}
        item={prev?.page}
        disabled={!prev?.page}
      >
        <MdChevronLeft />
      </Button>
      {first?.page && (
        <>
          <Button action={handlePaginationAction} item={first?.page}>
            {first?.page}
          </Button>
          <span className={classes.minus}>
            <FiMinus />
          </span>
        </>
      )}
      {prev?.page && (
        <Button action={handlePaginationAction} item={prev?.page}>
          {prev?.page}
        </Button>
      )}
      <Button
        action={handlePaginationAction}
        item={current?.page}
        style={classes.currentPage}
      >
        {current?.page}
      </Button>
      {next?.page && (
        <Button action={handlePaginationAction} item={next?.page}>
          {next?.page}
        </Button>
      )}
      {last?.page && (
        <>
          <span className={classes.minus}>
            <FiMinus />
          </span>
          <Button action={handlePaginationAction} item={3}>
            {last?.page}
          </Button>
        </>
      )}
      <Button
        action={handlePaginationAction}
        item={next?.page}
        disabled={!next?.page}
      >
        <MdChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
