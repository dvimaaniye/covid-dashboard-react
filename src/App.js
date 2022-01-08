import { useEffect, useState } from "react";
import InfoCard from "./components/InfoCard/InfoCard";
import StackedBar from "./components/StackedBar/StackedBar";
import Checkbox from "./components/Checkbox/Checkbox";
import Graph from "./components/Graph/Graph";
import Table from "./components/Table/Table";
import { ReactComponent as Descending } from "./assets/icons/decreasing.svg";
import { ReactComponent as Ascending } from "./assets/icons/increasing.svg";
import SearchIcon from "@material-ui/icons/Search";
import { graphDataFormatter } from "./utils";
import "./App.scss";

const ascending = (a, b) => (a > b ? 1 : -1);
const descending = (a, b) => (a > b ? -1 : 1);

const columns = [
    {
        title: "Country",
        field: "country",
        width: "20%",
        render: (rowData) => (
            <div style={{ display: "flex", alignItems: "center" }}>
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

function App() {
    const [globalStats, setGlobalStats] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [graphVisiblity, setGraphVisibility] = useState({
        total: true,
        active: true,
        recovered: true,
        deaths: true,
    });
    const [countrySearch, setCountrySearch] = useState("");
    const [tableData, setTableData] = useState([]);
    const [sortBy, setSortBy] = useState("active");
    const [orderBy, setOrderBy] = useState("desc");

    const onCheckboxToggle = (e) => {
        setGraphVisibility((currentValue) => {
            return {
                ...currentValue,
                [e.target.name]: e.target.checked,
            };
        });
    };

    useEffect(() => {
        fetch("https://corona.lmao.ninja/v2/all")
            .then((res) => res.json())
            .then((data) => {
                setGlobalStats(data);
                setBarData([
                    { id: 1, value: data.recovered, color: "#00E57D" },
                    { id: 2, value: data.active, color: "#597BFF" },
                    { id: 3, value: data.deaths, color: "#EF2121" },
                ]);
                setGraphData((currentGraphData) => {
                    return [
                        ...currentGraphData,
                        {
                            date: new Date().toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                            }),
                            total: data?.cases,
                            recovered: data?.recovered,
                            deaths: data?.deaths,
                            active: data?.active,
                        },
                    ];
                });
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        fetch("https://corona.lmao.ninja/v2/historical/all")
            .then((res) => res.json())
            .then((data) => {
                const _graphData = graphDataFormatter(data);
                console.log(_graphData);
                setGraphData(_graphData);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        fetch("https://corona.lmao.ninja/v2/countries?sort=active")
            .then((res) => res.json())
            .then((data) => {
                setTableData(
                    data.map(
                        ({
                            countryInfo,
                            country,
                            active,
                            recovered,
                            deaths,
                            cases,
                        }) => ({
                            flag: countryInfo.flag,
                            country,
                            active,
                            recovered,
                            deaths,
                            total: cases,
                        })
                    )
                );
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="app">
            <h1 className="app__titlebar">COVID-19 DASHBOARD</h1>
            <div className="app__container">
                <img
                    src={require("./assets/images/character-right.png")}
                    alt="character sitting with mask"
                    className="app__character app__character--right"
                />
                <div className="app__main">
                    <section className="app__worldwide">
                        <h2 className="app__title">WORLDWIDE STATISTICS</h2>
                        {/* For today's global data https://corona.lmao.ninja/v2/all */}
                        <div className="app__statcards">
                            <InfoCard
                                title="Total"
                                number={globalStats?.cases || "N/A"}
                            />
                            <div className="app__cardrow">
                                <InfoCard
                                    title="Recovered"
                                    number={globalStats?.recovered || "N/A"}
                                    bg="green"
                                />
                                <InfoCard
                                    title="Active"
                                    number={globalStats?.active || "N/A"}
                                    bg="blue"
                                />
                                <InfoCard
                                    title="Deaths"
                                    number={globalStats?.deaths || "N/A"}
                                    bg="red"
                                />
                            </div>
                        </div>
                        <StackedBar data={barData} sorted={false} />
                    </section>
                    <section className="app__statistics">
                        <h2 className="app__title">Stats Graph</h2>
                        <div className="app__checkboxes">
                            <Checkbox
                                name="total"
                                checked={graphVisiblity.total}
                                onChange={onCheckboxToggle}
                            >
                                Total cases
                            </Checkbox>
                            <Checkbox
                                name="active"
                                checked={graphVisiblity.active}
                                onChange={onCheckboxToggle}
                            >
                                Active cases
                            </Checkbox>
                            <Checkbox
                                name="recovered"
                                checked={graphVisiblity.recovered}
                                onChange={onCheckboxToggle}
                            >
                                Recovered cases
                            </Checkbox>
                            <Checkbox
                                name="deaths"
                                checked={graphVisiblity.deaths}
                                onChange={onCheckboxToggle}
                            >
                                Death cases
                            </Checkbox>
                        </div>
                        {/* For last 30 days global data https://corona.lmao.ninja/v2/historical/all*/}
                        {/* For today's global data https://corona.lmao.ninja/v2/all */}
                        <Graph
                            data={graphData}
                            fields={[
                                [graphVisiblity.total ? "total" : "", "#888"],
                                [
                                    graphVisiblity.active ? "active" : "",
                                    "#597bff",
                                ],
                                [
                                    graphVisiblity.recovered ? "recovered" : "",
                                    "#00bd77",
                                ],
                                [
                                    graphVisiblity.deaths ? "deaths" : "",
                                    "#ed2121",
                                ],
                            ]}
                        />
                    </section>
                    <section className="app__countriesreport">
                        <h2 className="app__title">Countries Report</h2>
                        <div className="app__tableprops">
                            <div className="app__searchbar">
                                <label
                                    htmlFor="searchCountry"
                                    style={{ height: "24px" }}
                                >
                                    <SearchIcon />
                                </label>
                                <input
                                    id="searchCountry"
                                    type="text"
                                    placeholder="Search..."
                                    value={countrySearch}
                                    onChange={(e) => {
                                        setCountrySearch(e.target.value);
                                        // setTableData(
                                        //     searchInArayOfObjects(
                                        //         e.target.value,
                                        //         tableData,
                                        //         "country"
                                        //     )
                                        // );
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="sortBy">Sort by: </label>
                                <select
                                    name="sortBy"
                                    id="sortBy"
                                    className="app__dropdown"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="country">Country</option>
                                    <option value="active">Active</option>
                                    <option value="recovered">Recovered</option>
                                    <option value="deaths">Deaths</option>
                                    <option value="total">Total</option>
                                </select>
                            </div>
                            <div className="app__table__orderby">
                                <p>Order by:</p>
                                <button
                                    type="button"
                                    className={`app__button  ${
                                        orderBy === "desc"
                                            ? "app__button--active"
                                            : ""
                                    }`}
                                    title="High to Low"
                                    onClick={() => {
                                        setOrderBy("desc");
                                        setTableData((currentData) =>
                                            currentData.sort((a, b) =>
                                                descending(a[sortBy], b[sortBy])
                                            )
                                        );
                                    }}
                                >
                                    <Descending />
                                </button>
                                <button
                                    type="button"
                                    className={`app__button  ${
                                        orderBy === "asc"
                                            ? "app__button--active"
                                            : ""
                                    }`}
                                    title="Low to High"
                                    onClick={() => {
                                        setOrderBy("asc");
                                        setTableData((currentData) =>
                                            currentData.sort((a, b) =>
                                                ascending(a[sortBy], b[sortBy])
                                            )
                                        );
                                    }}
                                >
                                    <Ascending />
                                </button>
                            </div>
                        </div>
                        {/* For all countries total stats https://corona.lmao.ninja/v2/countries */}
                        <Table
                            data={tableData.filter(
                                (obj) =>
                                    obj["country"].search(
                                        new RegExp(countrySearch, "i")
                                    ) >= 0
                            )}
                            columns={columns}
                        />
                    </section>
                </div>

                <img
                    src={require("./assets/images/character-left.png")}
                    alt="character sitting with mask"
                    className="app__character app__character--left"
                />
            </div>
        </div>
    );
}

export default App;
