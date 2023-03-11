import { useQuery } from "react-query";
import { getUserByUsername } from "../sdk/api/users";

export const useUserProfile = (username) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["userProfile", { username }],
    queryFn: () => getUserByUsername(username),
  });

  return { isLoading, data, isError };
};
