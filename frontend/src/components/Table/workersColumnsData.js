import { rolesData } from "../../data/rolesData";
export const workersColumnsData = [
  {
    Header: "Id",
    accessor: "_id",
    isSort: true,
  },
  {
    Header: "Vardas",
    accessor: "name",
    isSort: true,
  },
  {
    Header: "El. Paštas",
    accessor: "email",
    isSort: true,
  },
  {
    Header: "Rolė",
    accessor: "role",
    isSort: true,
    Cell: (tableData) => {
      return rolesData[tableData.value];
    },
  },
];
