import React, { useMemo, useEffect } from "react";
import {
  useGlobalFilter,
  useSortBy,
  useTable,
  usePagination,
} from "react-table";
import Button from "../Buttons/ToggleButton/ToggleButton";
import { trackOrder } from "../../data/trackOrder";
import {
  TiArrowSortedUp,
  TiArrowSortedDown,
  TiArrowUnsorted,
  TiMinus,
  TiPlus,
  TiEdit,
} from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import { VscOpenPreview } from "react-icons/vsc";
import classes from "./Table.module.css";
import GlobalFilter from "./GlobalFilter/GlobalFilter";
import ViewOrderProducts from "../Pages/Orders/ViewOrderProducts/ViewOrderProducts";
import TablePagination from "../Pagination/TablePagination/TablePagination";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
const Table = ({
  data,
  loading,
  columnsData,
  handleDelete,
  handleAdd,
  handleUpdate,
  userCookie,
  adminOrder,
  handleUpdateOrder,
  fetchData,
  pageCount: controlledPageCount,
  paginationNavigation,
}) => {
  const memoColumns = useMemo(() => columnsData, [columnsData]);
  const orderListByRole = (track) => {
    if (userCookie.role === "KitchenWorker") {
      return kitchenWorkerExcludeTrack(track);
    }
    if (userCookie.role === "Courier") {
      return courierExcludeTrack(track);
    }
    return false;
  };
  const kitchenWorkerExcludeTrack = (track) => {
    return ["Draft", "Delivery", "Canceled", "Completed"].includes(track);
  };
  const courierExcludeTrack = (track) => {
    return ["Draft", "Canceled", "Preparing", "Ordered"].includes(track);
  };
  const memoData = useMemo(() => data, [data]);
  const tableHoooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "edit",
        Cell: (props) => (
          <div className={classes.tableEditBtns}>
            {adminOrder && (
              <>
                <ViewOrderProducts
                  adminOrder={true}
                  order={props.row.original.order}
                  orderProduct={props.row.original.orderProducts}
                  btnText={<VscOpenPreview />}
                />
              </>
            )}
            {!adminOrder && (
              <>
                <Button action={handleUpdate} item={props.row.original}>
                  <TiEdit />
                </Button>
                <Button
                  style={classes.deleteBtn}
                  action={handleDelete}
                  id={props.row.values._id}
                  item={props.data}
                >
                  {" "}
                  <AiFillDelete />{" "}
                </Button>
              </>
            )}
          </div>
        ),
      },
    ]);
  };
  const tableInstance = useTable(
    {
      columns: memoColumns,
      data: memoData,
      pageCount: controlledPageCount,
      manualPagination: true,
      autoResetPage: false,
      manualGlobalFilter: true,
    },
    useGlobalFilter,
    tableHoooks,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    gotoPage,
    state: { pageIndex, pageSize, globalFilter },
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = tableInstance;
  useEffect(() => {
    fetchData && fetchData(pageIndex, globalFilter);
  }, [fetchData, pageIndex, pageSize, globalFilter]);
  const showTitle = (column) => {
    if (column.accessor) {
      return (
        <span>
          {column.render("Header")}{" "}
          {column.isSort &&
            (column.isSorted ? (
              column.isSortedDesc ? (
                <TiArrowSortedDown />
              ) : (
                <TiArrowSortedUp />
              )
            ) : (
              <TiArrowUnsorted />
            ))}
        </span>
      );
    }
  };
  return (
    <>
      {loading ? (
        <LoadingScreen loading={loading} />
      ) : (
        <div className={classes.tableContainer}>
          <div
            className={`${classes.globalFilter} ${
              adminOrder ? classes.globalFilterMargin : ""
            }`}
          >
            {!adminOrder && (
              <Button action={handleAdd} style={classes.addBtn}>
                <TiPlus className={classes.plusIcon} />
                <span className={classes.addText}>Pridėti</span>
              </Button>
            )}
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              setGlobalFilter={setGlobalFilter}
              globalFilter={globalFilter}
              adminOrder={adminOrder}
            />
          </div>
          {!data?.length ? (
            <p className={classes.empty}>Duomenų nerasta</p>
          ) : (
            <div className={classes.tableParent}>
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.isSort && column.getSortByToggleProps()
                          )}
                        >
                          {showTitle(column)}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell, index) => {
                          return (
                            <td {...cell.getCellProps()}>
                              <>
                                {cell.column.selection && (
                                  <select
                                    name={"trackOrder"}
                                    value={cell.value}
                                    onChange={(e) =>
                                      handleUpdateOrder(
                                        e,
                                        cell.row.original.order._id
                                      )
                                    }
                                    className={classes.trackOrder}
                                  >
                                    {Object.keys(trackOrder).map(
                                      (track, index) => {
                                        if (orderListByRole(track)) {
                                          return false;
                                        }
                                        return (
                                          <option key={index} value={track}>
                                            {trackOrder[track]}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                )}
                                {!cell.column.selection &&
                                  (cell.value ? (
                                    cell.value === true ? (
                                      <TiPlus />
                                    ) : (
                                      cell.render("Cell")
                                    )
                                  ) : cell.column.id !== "edit" ? (
                                    <TiMinus />
                                  ) : (
                                    cell.render("Cell")
                                  ))}
                              </>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className={classes.pagination}>
                <TablePagination
                  paginationNavigation={paginationNavigation}
                  gotoPage={gotoPage}
                  previousPage={previousPage}
                  nextPage={nextPage}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Table;
