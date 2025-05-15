import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1ZGVyIiwiYSI6ImNtYXBrZWlubDBoOHcya3MzcnlpZDU3bm4ifQ.hApMcQDp5sqiU-Q5eziAMA';

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible || !mapContainerRef.current) return;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [137.915, 36.259],
      zoom: 9
    });

    mapRef.current.on('style.load', () => {
      mapRef.current!.setFog({});
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [visible]);

  useEffect(() => {
    if (visible && mapRef.current) {
      mapRef.current.resize();
    }
  }, [visible]);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Mostrar mapa</button>
      {visible && (
        <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
      )}
    </div>
  );
};

export default Map;