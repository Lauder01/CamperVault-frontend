import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1ZGVyIiwiYSI6ImNtYXBrZWlubDBoOHcya3MzcnlpZDU3bm4ifQ.hApMcQDp5sqiU-Q5eziAMA';

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
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
            attribution: '© Instituto Geográfico Nacional de España'
          }
        },
        layers: [
          {
            id: 'ign-ortofoto',
            type: 'raster',
            source: 'ign-ortofoto',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: [-3.7038, 40.4168],
      zoom: 5,
      maxZoom: 19
    });

    window.addEventListener('resize', () => {
      map.resize();
    });

    return () => {
      map.remove();
      window.removeEventListener('resize', () => {
        map.resize();
      });
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