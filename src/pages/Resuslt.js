import { useEffect, useState } from "react";
import { Driver, Races, Teams } from "../shared/data";
import "./Result.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Result = () => {
  const [isActive, setActive] = useState(null);
  const [isActiveDriver, setActiveDriver] = useState(null);
  const [isActiveDetailDriver, setActiveDetailDriver] = useState(null);
  const [isActiveDetailRace, setActiveDetailRace] = useState(null);
  const [isActiveDetailTeam, setActiveDetailTeam] = useState(null);
  const [filterRaces, setFilterRaces] = useState([]);
  const [filterDriver, setFilterDriver] = useState([]);
  const [matchOfDriver, setMatchOfDriver] = useState([]);
  const [driverDetail, setDriverDetail] = useState([]);
  const [raceDetail, setRaceDetail] = useState([]);
  const [dataChart, setDataChart] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (!isActive) {
      setActive(2023);
    }
    if (!isActiveDriver) {
      setActiveDriver("race");
    }
    setActiveDetailRace("all");
    setActiveDetailDriver("all");
    setActiveDetailTeam("all");
    filterByYear(isActive);
  }, [isActiveDriver, isActive]);

  // filter by year and race
  const filterByYear = (year = "2023") => {
    const filterRaceByYear = Races.filter(
      (race) => race.date.slice(-4) == year
    );

    // handle click races, drivers and teams
    // filter by driver
    if (isActiveDriver === "driver") {
      // filterByYear(year);
      const filteredDrivers = Driver.filter((driver) =>
        driver.matchs.find((match) => match.date.slice(-4) == year)
      );

      // filter all matches of person by year
      const filteredMatches = filteredDrivers.map((match) => {
        return {
          name: match.name,
          nationality: match.nationality,
          matchs: match.matchs.filter((match) => match.date.slice(-4) == year),
        };
      });

      setMatchOfDriver(filteredMatches);
      setFilterDriver(filteredDrivers);
    }

    setFilterRaces(filterRaceByYear);
  };

  // handle click year
  const handleSearchByYear = (e) => {
    setActive(e.target.value);
    filterByYear(e.target.value);
  };

  // handle Click drivers
  const handleSearchByDriver = (e) => {
    setActiveDriver(e.target.accessKey);
  };

  // handle click detail driver
  const handleSearchDriverDetail = (e) => {
    setActiveDetailDriver(e.target.accessKey || "all");
    setActiveDetailRace(e.target.accessKey || "all");
    setActiveDetailTeam(e.target.accessKey || "all");
    if (e.target.accessKey && isActiveDriver === "driver") {
      const driverDetail = matchOfDriver.find(
        (driver) => driver.name === e.target.accessKey
      );
      setDriverDetail(driverDetail.matchs);
    }

    if (e.target.accessKey && isActiveDriver === "race") {
      const racesDetail = filterRaces.find(
        (race) => race.grandPrix === e.target.accessKey
      );
      setRaceDetail(racesDetail.drivers);
    }

    if (e.target.accessKey && isActiveDriver === "team") {
      const labels = [2023, 2022, 2021, 2020, 2019, 2018, 2017];

      const teamsChart = Teams.find((team) => team.team === e.target.accessKey);
      console.log(teamsChart.PTS);

      const data = {
        labels,
        datasets: [
          {
            label: teamsChart.team,
            data: teamsChart.PTS,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };
      setDataChart(data);
    }
  };

  return (
    <div>
      <Header />
      <div className="result">
        <div className="result__select">
          <ul onClick={handleSearchByYear}>
            <li className={isActive === 2023 ? "actived" : ""} value={2023}>
              2023
            </li>
            <li className={isActive === 2022 ? "actived" : ""} value={2022}>
              2022
            </li>
            <li className={isActive === 2021 ? "actived" : ""} value={2021}>
              2021
            </li>
            <li className={isActive === 2020 ? "actived" : ""} value={2020}>
              2020
            </li>
            <li className={isActive === 2019 ? "actived" : ""} value={2019}>
              2019
            </li>
            <li className={isActive === 2018 ? "actived" : ""} value={2018}>
              2018
            </li>
            <li className={isActive === 2017 ? "actived" : ""} value={2017}>
              2017
            </li>
          </ul>
          <ul onClick={handleSearchByDriver}>
            <li
              className={isActiveDriver === "race" ? "actived" : ""}
              accessKey="race"
            >
              RACES
            </li>
            <li
              className={isActiveDriver === "driver" ? "actived" : ""}
              accessKey="driver"
            >
              DRIVERS
            </li>
            <li
              className={isActiveDriver === "team" ? "actived" : ""}
              accessKey="team"
            >
              TEAMS
            </li>
          </ul>
          <ul onClick={handleSearchDriverDetail}>
            <li className={isActiveDetailRace === "all" ? "actived" : ""}>
              ALL
            </li>
            {isActiveDriver === "driver"
              ? filterDriver.map((item, i) => (
                  <li
                    className={
                      isActiveDetailDriver === `${item.name}` ? "actived" : ""
                    }
                    accessKey={`${item.name}`}
                    key={i}
                  >
                    {item.name}
                  </li>
                ))
              : isActiveDriver === "race"
              ? filterRaces.map((item, i) => (
                  <li
                    className={
                      isActiveDetailRace === `${item.grandPrix}`
                        ? "actived"
                        : ""
                    }
                    accessKey={`${item.grandPrix}`}
                    key={i}
                  >
                    {item.grandPrix}
                  </li>
                ))
              : Teams.map((team, i) => (
                  <li
                    className={
                      isActiveDetailTeam === `${team.team}` ? "actived" : ""
                    }
                    key={i}
                    accessKey={`${team.team}`}
                  >
                    {team.team}
                  </li>
                ))}
          </ul>
        </div>
        <div className="result__table">
          <h1>RESULTS</h1>
          <div className="result__mainTable">
            <table>
              <thead>
                {isActiveDriver === "driver" &&
                isActiveDetailDriver === "all" ? (
                  <tr>
                    <td>POS</td>
                    <td>DRIVER</td>
                    <td>NATIONALITY</td>
                    <td>CAR</td>
                    <td>PTS</td>
                  </tr>
                ) : isActiveDriver === "driver" ? (
                  <tr>
                    <td>GRAND PRIX</td>
                    <td>DATE</td>
                    <td>CAR</td>
                    <td>RACE POSITION</td>
                    <td>PTS</td>
                  </tr>
                ) : isActiveDriver === "race" &&
                  isActiveDetailRace !== "all" ? (
                  <tr>
                    <td>POS</td>
                    <td>NO</td>
                    <td>DRIVER</td>
                    <td>CAR</td>
                    <td>LAPS</td>
                    <td>TIME</td>
                    <td>PTS</td>
                  </tr>
                ) : isActiveDriver === "team" &&
                  isActiveDetailTeam !== "all" ? (
                  ""
                ) : isActiveDriver === "team" ? (
                  <tr>
                    <td>POS</td>
                    <td>TEAM</td>
                    <td>PTS</td>
                  </tr>
                ) : (
                  <tr>
                    <td>GRAND PRIX</td>
                    <td>DATE</td>
                    <td>WINNER</td>
                    <td>CAR</td>
                    <td>LAPS</td>
                    <td>TIME</td>
                  </tr>
                )}
              </thead>
              <tbody>
                {isActiveDriver === "driver" &&
                isActiveDetailDriver !== "all" ? (
                  driverDetail.map((detail, i) => (
                    <tr key={i}>
                      <td>{detail.grandPrix}</td>
                      <td>{detail.date}</td>
                      <td>{detail.team}</td>
                      <td>{detail.racePosition}</td>
                      <td>{detail.PTS}</td>
                    </tr>
                  ))
                ) : isActiveDriver === "driver" ? (
                  matchOfDriver.map((driver, i) => (
                    <tr key={i} onClick={handleSearchDriverDetail}>
                      <td>{i + 1}</td>
                      <td
                        accessKey={`${driver.name}`}
                        style={{ cursor: "pointer" }}
                      >
                        {driver.name}
                      </td>
                      <td>{driver.nationality}</td>
                      <td>{driver.matchs[0].team}</td>
                      <td>
                        {driver.matchs.reduce((acc, cur) => acc + cur.PTS, 0)}
                      </td>
                    </tr>
                  ))
                ) : isActiveDriver === "race" &&
                  isActiveDetailRace !== "all" ? (
                  raceDetail.map((race, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{race.no}</td>
                      <td>{race.driver}</td>
                      <td>{race.car}</td>
                      <td>{race.laps}</td>
                      <td>{race.time}</td>
                      <td>{race.PTS}</td>
                    </tr>
                  ))
                ) : isActiveDriver === "team" &&
                  isActiveDetailTeam !== "all" ? (
                  <Line data={dataChart} />
                ) : isActiveDriver === "team" ? (
                  Teams.map((team, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td
                        onClick={handleSearchDriverDetail}
                        accessKey={`${team.team}`}
                        style={{ cursor: "pointer" }}
                      >
                        {team.team}
                      </td>
                      <td>{team.PTS[0]}</td>
                    </tr>
                  ))
                ) : (
                  filterRaces.map((race, i) => (
                    <tr key={i} onClick={handleSearchDriverDetail}>
                      <td
                        accessKey={`${race.grandPrix}`}
                        style={{ cursor: "pointer" }}
                      >
                        {race.grandPrix}
                      </td>
                      <td>{race.date}</td>
                      <td>{race.winner}</td>
                      <td>{race.car}</td>
                      <td>{race.laps}</td>
                      <td>{race.time}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Result;
