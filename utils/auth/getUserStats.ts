import fetch from "node-fetch";

const getUserStats = async (id) => {
  const response = await fetch(
    `${process.env.AUTH0_MANAGEMENT_API_ENDPOINT}${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
      },
    }
  );

  const userStats = await response.json();

  return userStats;
};

export default getUserStats;
