import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { USER_SEARCH_PAGE_SIZE } from "../../sdk/constants";
import "./styles.css";

import { getUsers } from "../../sdk/api/users";
import UserCard from "../../components/UserCard";
import Loader from "../../components/Loader";

const SearchResult = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const { isLoading, data } = useQuery({
    queryKey: ["searchResults", { query, page }],
    queryFn: () => getUsers(query, page),
    keepPreviousData: true, // display the current data till fresh data is fetched
  });

  useEffect(() => {
    const totalPageCount = Math.ceil(data?.total_count / USER_SEARCH_PAGE_SIZE);
    setTotalPage(totalPageCount);
  }, [data?.total_count]);

  // Error and loading states
  if (data?.message)
    return (
      <div className="flex-center notification">
        Request Failed. Please try after some time
      </div>
    );
  if (isLoading) return <Loader />;
  if (data?.items?.length === 0)
    return <div className="flex-center notification">No User Found</div>;

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
