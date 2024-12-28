export const reservatoinAPI = async (body, driverId) => {
  const url = `http://localhost:8080/make-reservation/${driverId}`;
  const request = new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  try {
    const response = await fetch(request);
    if (response.status !== 200) {
      throw new Error("Failed to fetch parking lots");
    }
    const data = await response.json();
    console.log("Fetched parking lots:", data);
    return data;
  } catch (error) {
    console.error("Error fetching parking lots:", error);
  }
};