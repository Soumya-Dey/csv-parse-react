import React, { useState } from "react";
import axios from "axios";
import CSVReader from "react-csv-reader";

import "./App.css";

const App = () => {
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      products: results,
    };

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const res = await axios.post(
      "http://134.209.153.159:4000/products/upload",
      data,
      config
    );

    if (res.data) setLoading(false);
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
      {loading && <p>uploading...</p>}
    </div>
  );
};

export default App;
