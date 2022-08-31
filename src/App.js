import { useState, useEffect, useCallback } from "react";
import Pagination from "./Pagination";

import "./styles.css";

export default function App() {
  const [term, setTerm] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const fetchData = useCallback(async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = data.filter((item) =>
    item.title.includes(term.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <h1>Simple Search Filter</h1>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <hr />
      <ul>
        {currentPosts.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <Pagination
        paginate={paginate}
        postsPerPage={postsPerPage}
        totalPosts={filteredData.length}
      />
    </div>
  );
}
