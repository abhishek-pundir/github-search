import { useQuery } from "react-query";
import { getUsers } from "../sdk/api/users";

export const useSearchUsers = (query: string, page: number) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["searchUsers", { query, page }],
    queryFn: () => getUsers(query, page),
    keepPreviousData: true, // display the current data till fresh data is fetched
  });

  return { isLoading, data, isError };
};
