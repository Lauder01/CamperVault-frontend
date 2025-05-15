import 'mapbox-gl/dist/mapbox-gl.css';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1ZGVyIiwiYSI6ImNtYXBrZWlubDBoOHcya3MzcnlpZDU3bm4ifQ.hApMcQDp5sqiU-Q5eziAMA';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/satellite-v9', // estilo satélite
      center: [-3.7038, 40.4168], // ejemplo: Madrid
      zoom: 5,
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden' }}
    />
  );
};

export default Map;