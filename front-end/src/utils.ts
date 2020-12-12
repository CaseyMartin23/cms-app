export const addAuthHeaders = () => {
  const auth_user = localStorage.getItem("auth_user");
  const token = auth_user ? JSON.parse(auth_user).token : "";

  if (token === "") throw new Error("User is not authenticated");

  return {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
