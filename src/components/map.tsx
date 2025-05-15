import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1ZGVyIiwiYSI6ImNtYXBrZWlubDBoOHcya3MzcnlpZDU3bm4ifQ.hApMcQDp5sqiU-Q5eziAMA';

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard-satellite',
      center: [137.915, 36.259],
      zoom: 9
    });

    mapRef.current.on('style.load', () => {
      mapRef.current!.setFog({});
      mapRef.current!.resize();
    });

    window.addEventListener('resize', () => {
      mapRef.current && mapRef.current.resize();
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      window.removeEventListener('resize', () => {
        mapRef.current && mapRef.current.resize();
      });
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100vw',
        height: 'calc(100vh - 60px)', // Ajusta 60px si tu header es más alto o bajo
        position: 'absolute',
        top: '60px', // Ajusta según la altura de tu título/header
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />
  );
};

export default Map;