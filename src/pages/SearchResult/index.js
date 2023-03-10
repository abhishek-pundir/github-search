import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import useSearchUsers from "../../hooks/useSearchUsers";
import { USER_SEARCH_PAGE_SIZE } from "../../sdk/constants";
import { REQUEST_FAILED, NO_USER_FOUND } from "../../constants";
import "./styles.css";

import UserCard from "../../components/UserCard";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

const SearchResult = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const { isLoading, data } = useSearchUsers(query, page);

  useEffect(() => {
    const totalPageCount = Math.ceil(data?.total_count / USER_SEARCH_PAGE_SIZE);
    setTotalPage(totalPageCount);
  }, [data?.total_count]);

  // Error and loading states
  if (isLoading) return <Loader />;
  if (data?.message) return <ErrorMessage message={REQUEST_FAILED} />;
  if (data?.items?.length === 0)
    return <ErrorMessage message={NO_USER_FOUND} />;

  return (
    <div className="search-result">
      <h3 className="result-count">{data.total_count} users</h3>
      <div className="list-wrapper">
        {data?.items?.map((item) => (
          <UserCard key={item?.id} data={item} />
        ))}
      </div>
      <div className="pagination-footer">
        <button
          className="nav-btn"
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
        >
          <BsArrowLeft /> Previous
        </button>
        <span className="page-number">
          {page} / {totalPage}
        </span>
        <button
          className="nav-btn"
          disabled={page === totalPage}
          onClick={() => setPage((page) => page + 1)}
        >
          Next <BsArrowRight />
        </button>
      </div>
    </div>
  );
};

export default SearchResult;
