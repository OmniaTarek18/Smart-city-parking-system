

export const generateParkingLotReport = async (lotId) => {
    try {
        const response = await fetch(`http://localhost:8080/admin/reports/parking-lot/${lotId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("error");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        return url;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
