import React, { useMemo } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
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
const Table = ({
  data,
  columnsData,
  handleDelete,
  handleAdd,
  handleUpdate,
  adminOrder,
  handleUpdateOrder,
}) => {
  //useMemo hook atsimina duomenis kiekvineo render metu ir isaugo talpykloje(cache) ir nekviecia per naujo funkcijos jeigu dependency nepasikeite
  const memoColumns = useMemo(() => columnsData, [columnsData]);
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
  //Naudojame hook (actual data, columns = th)
  const tableInstance = useTable(
    {
      columns: memoColumns,
      data: memoData,
    },
    useGlobalFilter,
    tableHoooks,
    useSortBy
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;
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
            globalFilter={state.globalFilter}
            adminOrder={adminOrder}
          />
        </div>
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
              {rows.map((row) => {
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
                                {Object.keys(trackOrder).map((track, index) => {
                                  return (
                                    <option key={index} value={track}>
                                      {trackOrder[track]}
                                    </option>
                                  );
                                })}
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
            <tfoot>
              {footerGroups.map((footerGroup) => (
                <tr {...footerGroup.getFooterGroupProps()}>
                  {footerGroup.headers.map((column) => (
                    <td {...column.getFooterProps()}>
                      {column.render("Footer")}
                    </td>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
