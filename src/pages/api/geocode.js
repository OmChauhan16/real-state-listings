import axios from 'axios';

export default async function handler(req, res) {
  const { location } = req.query;
  try {
    const geoRes = await axios.get('http://api.positionstack.com/v1/forward', {
      params: {
        access_key: process.env.POSITIONSTACK_API_KEY,
        query: location,
        limit: 1
      }
    });
    const data = geoRes.data.data[0];
    if (data) {
      res.status(200).json({ latitude: data.latitude, longitude: data.longitude });
    } else {
      res.status(200).json({ latitude: null, longitude: null });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Geocoding failed' });
  }
}