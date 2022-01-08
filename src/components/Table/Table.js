import React from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";

import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";

const tableIcons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
};
const Table = ({ data, columns }) => {
    return (
        <>
            <MaterialTable
                icons={tableIcons}
                title=""
                data={data}
                columns={columns}
                // style={{ height: "580px", overflow: "auto" }}
                options={{
                    search: false,
                    sorting: false,
                    paging: true,
                    toolbar: false,
                    headerStyle: {
                        fontWeight: 700,
                        fontSize: "1.125rem",
                    },
                    draggable: false,
                }}
            />
        </>
    );
};

export default React.memo(Table);
