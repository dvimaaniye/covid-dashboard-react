import InfoCard from "./components/InfoCard/InfoCard";
import StackedBar from "./components/StackedBar/StackedBar";
import Checkbox from "./components/Checkbox/Checkbox";
import Graph from "./components/Graph/Graph";
import Table from "./components/Table/Table";
import { ReactComponent as DecreasingIcon } from "./assets/icons/decreasing.svg";
import { ReactComponent as IncreasingIcon } from "./assets/icons/increasing.svg";
import SearchIcon from "@material-ui/icons/Search";
import "./App.scss";

function App() {
  const barData = [
    { color: "#00e57d", value: 207000 },
    { color: "#597bff", value: 400200 },
    { color: "#ed2121", value: 100000 },
  ];
  return (
    <div className="app">
      <h1 className="app__titlebar">COVID-19 DASHBOARD</h1>
      <div className="app__container">
        <section className="app__worldwide">
          <h2 className="app__title">WORLDWIDE</h2>
          <InfoCard title="Total" number="000,000,000" />
          <div className="app__cardrow">
            <InfoCard title="Recovered" number="000,000,000" bg="green" />
            <InfoCard title="Active" number="000,000,000" bg="blue" />
            <InfoCard title="Deaths" number="000,000,000" bg="red" />
          </div>
          <StackedBar data={barData} />
        </section>
        <section className="app__statistics">
          <h2 className="app__title">Statistics</h2>
          <div className="app__checkboxes">
            <Checkbox>Total cases</Checkbox>
            <Checkbox>Active cases</Checkbox>
            <Checkbox>Recovered cases</Checkbox>
            <Checkbox>Death cases</Checkbox>
          </div>

          <Graph></Graph>
        </section>
        <section className="app__countriesreport">
          <h2 className="app__title">Countries Report</h2>
          <div className="app__tableprops">
            <div className="app__searchbar">
              <SearchIcon />
              <input type="text" placeholder="Search..." />
            </div>
            <div>
              <label htmlFor="sortBy">Sort by: </label>
              <select name="sortBy" id="sortBy" className="app__dropdown">
                <option value="Country">Country</option>
                <option value="Active" selected>
                  Active
                </option>
                <option value="Recovered">Recovered</option>
                <option value="Deaths">Deaths</option>
                <option value="Total">Total</option>
              </select>
            </div>
            <div className="app__table__orderby">
              <p>Order by:</p>
              <button type="button">
                <DecreasingIcon />
              </button>
              <button type="button">
                <IncreasingIcon />
              </button>
            </div>
          </div>
          <Table />
        </section>
      </div>
    </div>
  );
}

export default App;
