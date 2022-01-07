import React from "react";
import MaterialTable from "material-table";

const Table = () => {
  const data = [
    {
      country: "India",
      total: 4000,
      active: 234,
      recovered: 540,
      deaths: 345,
    },
    {
      country: "China",
      total: 3000,
      active: 9234,
      recovered: 1540,
      deaths: 405,
    },
    {
      country: "USA",
      total: 22000,
      active: 10234,
      recovered: 1940,
      deaths: 555,
    },
    {
      country: "Canada",
      total: 22780,
      active: 9234,
      recovered: 2540,
      deaths: 645,
    },
    {
      country: "Malaysia",
      total: 22890,
      active: 9834,
      recovered: 5540,
      deaths: 845,
    },
    {
      country: "Bangladesh",
      total: 27390,
      active: 22234,
      recovered: 5940,
      deaths: 915,
    },
    {
      country: "Australia",
      total: 43490,
      active: 30034,
      recovered: 6540,
      deaths: 1145,
    },
  ];
  const columns = [
    {
      title: "Country",
      field: "country",
    },
    {
      title: "Active",
      field: "active",
    },
    {
      title: "Recovered",
      field: "recovered",
    },
    {
      title: "Deaths",
      field: "deaths",
    },
    {
      title: "Total",
      field: "total",
    },
  ];
  return (
    <>
      <MaterialTable
        title=""
        data={data}
        columns={columns}
        style={{ height: "580px", overflow: "auto" }}
        options={{
          search: false,
          sorting: false,
          paging: false,
          toolbar: false,
          headerStyle: {
            fontWeight: 700,
            fontSize: "1.125rem",
            // position: "sticky",
            // top: 0,
          },
        }}
      />
    </>
  );
};

export default Table;
