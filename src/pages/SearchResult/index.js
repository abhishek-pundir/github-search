import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import "./styles.css";

import { getUsers } from "../../sdk/api/users";
import UserCard from "../../components/UserCard/UserCard";

const SearchResult = () => {
  const [page, SetPage] = useState(1);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const { isLoading, error, data } = useQuery({
    queryKey: ["searchResults", { query, page }],
    queryFn: () => getUsers(query, page),
  });

  // Error and loading states
  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;
  if (data?.items?.length === 0) return <div>No User Found</div>;

  return (
    <div className="search-result">
      <h3 className="result-count text-xl font-semibold">
        {data.total_count} users
      </h3>
      <div className="list-wrapper">
        {data?.items?.map((item) => (
          <UserCard key={item?.id} data={item} />
          // <div key={result.id}>
          //   <h2>{result.title}</h2>
          //   <p>{result.description}</p>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
