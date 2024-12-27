export const lotLocationAPI = async (lotId) => {
    const url = `http://localhost:8080/lotLocation/${lotId}/coordinates`;
    const request = new Request(url)
    try {
        const response = await fetch(request);
        if(response.status !== 200) {
            throw new Error("Failed to fetch parking lot location");
        }
        const data = await response.json();
        console.log(data);
        return [data.latitude, data.longitude];
    } catch (error) {
        console.error("Error fetching parking lot location:", error);
    }
}