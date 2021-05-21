import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [className, setClassName] = useState("hide");

  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (node.current && !node.current.contains(e.target)) {
      setClassName("hide");
    }
  };

  const keyWordExist = (arr, keyword) => {
    // check if keyword exist
    // if it is return { keyword, index } else return false
    const existKeyword = arr.find((item) => item.keyword === keyword);
    let index = null;
    if (existKeyword) {
      index = arr.findIndex((item) => item.keyword === existKeyword.keyword);
      return {
        keyword: existKeyword,
        index,
      };
    } else {
      return false;
    }
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/name/${keyword ? keyword : "all"}`);

    const searchArr = localStorage.getItem("searchHistory")
      ? JSON.parse(localStorage.getItem("searchHistory"))
      : [];

    if (keyword.trim()) {
      const kwExist = keyWordExist(searchArr, keyword);

      if (!searchArr.length) {
        searchArr.push({ keyword });
      } else if (searchArr.length === 10 && !kwExist) {
        searchArr.unshift({ keyword });
        searchArr.pop();
      } else if (searchArr.length > 1 && kwExist) {
        console.log(kwExist);
        searchArr.splice(kwExist.index, 1);
        searchArr.unshift(kwExist.keyword);
      } else if (!kwExist) {
        searchArr.unshift({ keyword });
      }
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchArr));
  };

  const searchArr = localStorage.getItem("searchHistory")
    ? JSON.parse(localStorage.getItem("searchHistory"))
    : [];

  const filter = (searchArray) => {
    return searchArray.filter(
      (item) =>
        item.keyword.toLowerCase().indexOf(keyword.toLowerCase().trim()) !== -1
    );
  };

  const pullToTop = (keyword) => {
    const kwFound = searchArr.find((item) => item.keyword === keyword);
    const index = searchArr.findIndex((item) => item.keyword === keyword);
    searchArr.splice(index, 1);
    searchArr.unshift(kwFound);
    localStorage.setItem("searchHistory", JSON.stringify(searchArr));
  };

  return (
    <div className="search__box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          placeholder="Search here..."
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setClassName("show")}
        />
        <button type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>

      {searchArr.length ? (
        <div ref={node} className={`dropdown__history ${className}`}>
          <div className="title">Search history</div>
          <ul>
            {searchArr.length
              ? filter(searchArr).map((item) => (
                  <li>
                    <i class="far fa-clock"></i>
                    <Link
                      onClick={() => {
                        setClassName("hide");
                        setKeyword(item.keyword);
                        pullToTop(item.keyword);
                      }}
                      to={`/search/name/${item.keyword}`}
                    >
                      {item.keyword}
                    </Link>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default withRouter(Search);
