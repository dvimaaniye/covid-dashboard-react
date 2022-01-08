import React from "react";
import "./Table.scss";

const Table = ({ data, columns }) => {
    return (
        <div className="table__container">
            <table className="table">
                <tbody>
                    <tr
                        style={{
                            position: "sticky",
                            top: 0,
                            backgroundColor: "#f5f5f5",
                        }}
                    >
                        {columns.map((column) => (
                            <th
                                key={column.field}
                                style={{
                                    fontWeight: 700,
                                    fontSize: "1.125rem",
                                }}
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                    {data.map((obj) => (
                        <tr key={obj.country}>
                            {columns.map((col) => (
                                <td key={col.field}>
                                    {"render" in col
                                        ? col.render(obj)
                                        : obj[col.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {data.length === 0 && (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                    No records to show.
                </div>
            )}
        </div>
    );
};

export default React.memo(Table);
