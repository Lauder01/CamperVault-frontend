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
      style: {
        version: 8,
        sources: {
          'ign-ortofoto': {
            type: 'raster',
            tiles: [
              'https://www.ign.es/wmts/ortofoto?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=OI.OrthoimageCoverage&STYLE=default&FORMAT=image/jpeg&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}'
            ],
            tileSize: 256,
            attribution: '© Instituto Geográfico Nacional de España',
            minzoom: 6,
            maxzoom: 19
          }
        },
        layers: [
          {
            id: 'ign-ortofoto',
            type: 'raster',
            source: 'ign-ortofoto',
            minzoom: 6,
            maxzoom: 19
          }
        ]
      },
      center: [-3.7038, 40.4168], // Madrid
      zoom: 10,
      maxZoom: 19
    });

    const handleResize = () => {
      if (mapRef.current) mapRef.current.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100vw',
        height: 'calc(100vh - 60px)',
        position: 'absolute',
        top: '60px',
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />
  );
};

export default Map;