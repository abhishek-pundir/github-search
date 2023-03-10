import { useQuery } from "react-query";
import { getUserByUsername } from "../sdk/api/users";

const useUserProfile = (username) => {
  const { isLoading, data } = useQuery({
    queryKey: ["userProfile", { username }],
    queryFn: () => getUserByUsername(username),
  });

  return { isLoading, data };
};

export default useUserProfile;
