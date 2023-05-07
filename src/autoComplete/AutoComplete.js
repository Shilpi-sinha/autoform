import "./style.css";
import { useEffect, useState } from "react";
import birds from "../model";

const queries = JSON.parse(localStorage.getItem("pastquery")) || [];
const last = JSON.parse(localStorage.getItem("lastsearch")) || [];
const AutoComplete = () => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [pastQueries, setPastQueries] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    setResult(queries);
    setPastQueries(last);
  }, []);

  useEffect(() => {
    localStorage.setItem("pastquery", JSON.stringify(result));
    localStorage.setItem("lastsearch", JSON.stringify(pastQueries));
  }, [result, pastQueries]);

  const handleListItemHover = (item) => {
    setHoveredItem(item);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let bird_find = birds.find((bird) => bird.name === query);
    if (bird_find) {
      setResult(bird_find);
      if (pastQueries.slice(-5).includes(bird_find.name)) {
      } else {
        setPastQueries([...pastQueries, bird_find.name]);
      }
      setQuery("");
      setFilteredData([]);
    } else {
      alert("Sorry, No Bird found");
      setQuery("");
      setFilteredData([]);
    }
  };
  const handleChange = (event) => {
    const value = event.target.value;
    // const value = event.target.value;
    setQuery(value);
    const filteredData = birds.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredData.slice(0, 5));
  };

  const handleClear = () => {
    setQuery("");
    setFilteredData([]);
  };
  const handleList = (value) => {
    setQuery(value);
    setFilteredData([]);
  };
  // const handleEmpty = () => {};
  // function handleInputFocus() {
  //   setPastQueries(last);
  // }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            // onFocus={handleInputFocus}
            // onClick={() => handleEmpty()}
            placeholder="search here..."
            style={{
              color: "rgb(211, 204, 204)",
              backgroundColor: "rgb(70, 69, 67)",
            }}
          />
          <button type="submit">Search</button>
          {query ? (
            <span className="clearbtn" onClick={handleClear}>
              ❌
            </span>
          ) : null}
        </form>

        <ul className="matchbox">
          {query
            ? filteredData.map((item, index) => (
                <li
                  style={{
                    backgroundColor:
                      item === hoveredItem
                        ? "rgb(87 107 130)"
                        : "rgb(70, 69, 67)",
                  }}
                  key={index}
                  onMouseEnter={() => handleListItemHover(item)}
                  onMouseLeave={() => handleListItemHover(null)}
                  onClick={() => handleList(item.name)}
                >
                  {item.name.toLowerCase().indexOf(query.toLowerCase()) !==
                  -1 ? (
                    <>
                      <span>
                        {item.name.slice(
                          0,
                          item.name.toLowerCase().indexOf(query.toLowerCase())
                        )}
                      </span>
                      <span className="highlight">
                        {item.name.slice(
                          item.name.toLowerCase().indexOf(query.toLowerCase()),
                          item.name.toLowerCase().indexOf(query.toLowerCase()) +
                            query.length
                        )}
                      </span>
                      <span>
                        {item.name.slice(
                          item.name.toLowerCase().indexOf(query.toLowerCase()) +
                            query.length
                        )}
                      </span>
                    </>
                  ) : (
                    item
                  )}
                </li>
              ))
            : pastQueries.slice(-5).map((item, index) => (
                <li
                  style={{
                    backgroundColor:
                      item === hoveredItem
                        ? "rgb(87 107 130)"
                        : "rgb(70, 69, 67)",
                    // fontSize: "1.4rem",
                    // padding:"0.4em"
                  }}
                  onMouseEnter={() => handleListItemHover(item)}
                  onMouseLeave={() => handleListItemHover(null)}
                  onClick={() => handleList(item)}
                  className="list-item"
                  key={index}
                >
                  {item}
                </li>
              ))}
        </ul>
      </div>
      <div className="table-container">
        <table className="past-searches">
          <thead>
            <tr>
              <th>Your Search</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "rgb(211, 204, 204)" }}>{result.name}</tr>

            <tr
              className="pastSearchbox"
              style={{ color: "rgb(211, 204, 204)" }}
            >
              {result.about}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default AutoComplete;
