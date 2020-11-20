import React, { useState } from "react";
import axios from "axios";
import CSVReader from "react-csv-reader";

import "./App.css";

const App = () => {
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      products: results,
    };

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const res = await axios.post(
      "http://localhost:4000/products/upload", // change this link to the actual server api link
      data,
      config
    );

    console.log(res.data);
  };

  return (
    <div className="App">
      {/* parse in frontend, save in backend */}
      <h4>CSV Upload</h4>
      <form onSubmit={onSubmit}>
        <CSVReader
          parserOptions={{ header: true, skipEmptyLines: true }}
          onFileLoaded={(data, fileInfo) => {
            if (data) setResults(data);
          }}
          onError={(error) => {
            console.log(error);
            setError(error.message);
          }}
        />

        <input type="submit" value="upload"></input>
      </form>

      {error && <p>{error.message}</p>}
    </div>
  );
};

export default App;
