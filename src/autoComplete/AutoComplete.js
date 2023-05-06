import "./style.css";
import { useState } from "react";

const data = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "pineapple",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "watermelon",
];

const AutoComplete = () => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [pastQueries, setPastQueries] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleListItemHover = (item) => {
    setHoveredItem(item);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPastQueries([...pastQueries, query]);
    setQuery("");
    setFilteredData([]);
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    const filteredData = data.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredData.slice(0, 5));
  };
  const handleClear = () => {
    setQuery("");
  };
  const handleList = (value) => {
    setQuery(value);
    setFilteredData([]);
  };
  const handleListClick = (value) => {
    setQuery(value);
    setFilteredData([]);
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="search here..."
            style={{
              color: "rgb(211, 204, 204)",
              backgroundColor: "rgb(70, 69, 67)",
            }}
          />
          <button type="submit">Search</button>
          <span className="clearbtn" onClick={handleClear}>
            Clear
          </span>
        </form>

        <ul className="matchbox">
          {filteredData.map((item, index) => (
            <li
              style={{
                backgroundColor:
                  item === hoveredItem ? "rgb(87 107 130)" : "rgb(70, 69, 67)",
              }}
              key={index}
              onMouseEnter={() => handleListItemHover(item)}
              onMouseLeave={() => handleListItemHover(null)}
              onClick={() => handleList(item)}
              className="list-item"
            >
              {item.toLowerCase().indexOf(query.toLowerCase()) !== -1 ? (
                <span className="match" style={{ color: "rgb(211, 204, 204)" }}>
                  {item}
                </span>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="table-container">
        <table className="past-searches">
          <thead>
            <tr>
              <th>Past Searches</th>
            </tr>
          </thead>
          <tbody>
            {pastQueries.slice(-5).map((item, index) => (
              <tr
                className="pastSearchbox"
                key={index}
                onClick={() => {
                  handleListClick(item);
                }}
                style={{ color: "rgb(211, 204, 204)" }}
              >
                {item}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default AutoComplete;
