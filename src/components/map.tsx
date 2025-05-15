import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { get as getProjection } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';

// REGISTRA EPSG:25830
proj4.defs(
  'EPSG:25830',
  '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs +type=crs'
);
register(proj4);

const projection = getProjection('EPSG:25830');
const extent = [482000, 4640000, 700000, 4820000]; // Extensión aproximada de Navarra en EPSG:25830

const tileGrid = new WMTSTileGrid({
  origin: [extent[0], extent[3]],
  resolutions: [
    4891.96981025128, 2445.98490512564, 1222.99245256282, 611.49622628141,
    305.748113140705, 152.8740565703525, 76.43702828517625, 38.21851414258813,
    19.109257071294063, 9.554628535647032, 4.777314267823516, 2.388657133911758,
    1.194328566955879, 0.5971642834779395, 0.29858214173896974, 0.14929107086948487
  ],
  matrixIds: [
    '0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'
  ],
  tileSize: [256, 256],
  extent,
});

const OpenLayersMap = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new Map({
      target: mapContainerRef.current,
      layers: [
        new TileLayer({
          source: new WMTS({
            url: 'https://idena.navarra.es/ogc/wmts/ortofoto2024?',
            layer: 'ortofoto2024',
            matrixSet: 'EPSG:25830',
            format: 'image/jpeg',
            projection: projection!,
            tileGrid: tileGrid,
            style: 'default',
            attributions: '© Gobierno de Navarra',
            crossOrigin: 'anonymous',
          }),
        }),
      ],
      view: new View({
        projection: projection!,
        center: [600000, 4740000], // Centro aproximado de Navarra
        zoom: 8,
        extent,
      }),
    });

    const handleResize = () => {
      mapRef.current?.updateSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      mapRef.current?.setTarget(undefined);
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

export default OpenLayersMap;