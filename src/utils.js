const NumFormatter = (number) => {
    if (number > 1000000000) {
        return (number / 1000000000).toString() + "B";
    } else if (number > 1000000) {
        return (number / 1000000).toString() + "M";
    } else if (number > 1000) {
        return (number / 1000).toString() + "K";
    } else {
        return number.toString();
    }
};

const insertActiveCases = (arr) => {
    const newArr = [];
    arr.forEach((dataObj) => {
        const activeCases =
            dataObj?.total - dataObj?.recovered - dataObj?.deaths;
        newArr.push({ ...dataObj, active: activeCases });
    });
    return newArr;
};

const graphDataFormatter = (data) => {
    // {"cases":
    // {
    //     "12/9/21": 238478932, "12/10/21": 203840
    // },
    // "deaths": {
    //     "12/9/21": 234523, "12/10/21": 234523
    // }
    const fields = ["cases", "recovered", "deaths"];
    const formattedData = [];
    const intermediateData = {};
    for (const date in data["cases"]) {
        intermediateData[date] = {
            total: data.cases[date],
        };
    }
    fields.slice(1).forEach((field) => {
        for (const date in data[field]) {
            intermediateData[date] = {
                ...intermediateData[date],
                [field]: data[field][date],
            };
        }
    });
    for (const date in intermediateData) {
        formattedData.push({
            date: new Date(date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
            }),
            ...intermediateData[date],
        });
    }
    // [
    //   {
    //     date: "MMM DD",
    //     total: 4000,
    //     active: 234,
    //     recovered: 540,
    //     deaths: 345,
    //   },...
    // ];
    return insertActiveCases(formattedData);
};

// const searchInArayOfObjects = (term, arr, key) => {
//     const results = [];

//     arr.forEach((obj) => {
//         // console.log(obj[key], obj[key].search(new RegExp(term, "i")));
//         if (obj[key].search(new RegExp(term, "i")) >= 0) {
//             results.push(obj);
//         }
//     });
//     console.log(results);
//     return results;
// };

const ascending = (a, b) => (a > b ? 1 : -1);
const descending = (a, b) => (a > b ? -1 : 1);

const columns = [
    {
        title: "Country",
        field: "country",
        render: (rowData) => (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <img
                    src={rowData.flag}
                    alt={`${rowData.country}'s flag`}
                    style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "9999px",
                        marginRight: "8px",
                    }}
                />
                {rowData.country}
            </div>
        ),
    },
    {
        title: "Active",
        field: "active",
        type: "numeric",
    },
    {
        title: "Recovered",
        field: "recovered",
        type: "numeric",
    },
    {
        title: "Deaths",
        field: "deaths",
        type: "numeric",
    },
    {
        title: "Total",
        field: "total",
        type: "numeric",
    },
];
export { graphDataFormatter, NumFormatter, ascending, descending, columns };
