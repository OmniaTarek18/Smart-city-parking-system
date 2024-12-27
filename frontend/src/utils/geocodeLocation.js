import axios from 'axios';

const OPEN_CAGE_API_KEY = '1a4134713e044f06ab8089a2d1267075';  
const GEO_API_URL = 'https://api.opencagedata.com/geocode/v1/json';

const geocodeLocation = async (location) => {
    try {
        console.log(location)
        const response = await axios.get(GEO_API_URL, {
            params: {
                q: location, 
                key: OPEN_CAGE_API_KEY,  
                no_annotations: 1,  
            },
        });

        if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            return { latitude: lat, longitude: lng };
        } else {
            throw new Error('failed');
        }
    } catch (error) {
        console.error('error', error);
        throw error;
    }
};

export default geocodeLocation;
