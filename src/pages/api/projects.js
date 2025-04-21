const mockProjects = [
    {
      name: 'Palm Heights',
      location: 'Kukatpally, Hyderabad',
      price: '₹80L - ₹1.2Cr',
      builder: 'Prestige Group',
      latitude: 17.4945,
      longitude: 78.3992,
    },
    {
      name: 'SkyView Towers',
      location: 'Gachibowli, Hyderabad',
      price: '₹1Cr - ₹2Cr',
      builder: 'Lodha Group',
      latitude: 17.4401,
      longitude: 78.3489,
    },
    {
      name: 'Urban Greens',
      location: 'Hitech City, Hyderabad',
      price: '₹90L - ₹1.5Cr',
      builder: 'Godrej Properties',
      latitude: 17.4525,
      longitude: 78.3808,
    },
  ];
  
  export default function handler(req, res) {
    const { city } = req.query;
  
    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }
      
    // For demonstration purposes, just return the mock data for any city
    res.status(200).json({ city, projects: mockProjects });
  }
  