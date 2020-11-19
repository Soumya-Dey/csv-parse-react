import React, { useState } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const onChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "text/csv") setFile(selectedFile);
      else {
        setFile(null);
        setError("Only csv files are supported! Try again.");
      }
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("data", file);
    formData.append("separator", ",");

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      const res = await axios.post(
        "http://134.209.153.159:4000/products/upload",
        formData,
        config
      );
      console.log(res.data);
      if (res.data.results) setResults(res.data.results);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <h4>CSV Upload</h4>
        <input type="file" name="data" onChange={onChange} />
        <button type="submit">Upload</button>
        {error && <p>{error.message}</p>}
        {results &&
          results.map((result) => <p key={result._id}>{result.productName}</p>)}
      </form>
    </div>
  );
};

export default App;
