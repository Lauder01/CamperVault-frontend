import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1ZGVyIiwiYSI6ImNtYXBrZWlubDBoOHcya3MzcnlpZDU3bm4ifQ.hApMcQDp5sqiU-Q5eziAMA';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapContainer.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-3.7038, 40.4168],
      zoom: 5,
    });
    return () => map.remove();
  }, [isClient]);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden' }}
    />
  );
};

export default Map;