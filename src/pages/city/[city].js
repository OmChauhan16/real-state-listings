import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

export default function CityPage() {
  const router = useRouter();
  const { city } = router.query;

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    if (!city) return;

    setProjects([]);
    setLoading(true);

    // Fetch from API
    fetch(`/api/projects?city=${encodeURIComponent(city)}`)
      .then((res) => res.json())
      .then((data) => {
        const cityData = data.projects || [];
        setTotalProjects(cityData.length);

        let index = 0;
        const interval = setInterval(() => {
          if (index < cityData.length) {
            setProjects((prev) => [...prev, cityData[index]]);
            index++;
          } else {
            clearInterval(interval);
            setLoading(false);
          }
        }, 300); // delay per project
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });

    return () => setProjects([]); // cleanup on route change
  }, [city]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects in {city}</h1>

      {loading && (
        <div className="mb-4">
          <p className="text-blue-500 font-medium">Loading projects...</p>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${(projects.length / (totalProjects || 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, idx) => (
          project && (
            <div key={idx} className="border p-4 rounded shadow">
              <h2 className="font-semibold text-lg">{project.name}</h2>
              <p><strong>Location:</strong> {project.location}</p>
              <p><strong>Price:</strong> {project.price}</p>
              <p><strong>Builder:</strong> {project.builder}</p>
            </div>
          )
        ))}

      </div>

      <div className="mt-6">
        <Map projects={projects} />
      </div>
    </div>
  );
}
