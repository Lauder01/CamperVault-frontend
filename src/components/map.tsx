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
const extent = [480408, 4599748, 742552, 4861892]; // Extensión real de Navarra según capabilities

const tileGrid = new WMTSTileGrid({
  origin: [480408, 4861892], // TopLeftCorner del capabilities
  resolutions: [
    3657142.8571428573, 1828571.4285714286, 914285.7142857143, 457142.85714285716,
    228571.42857142858, 114285.71428571429, 57142.857142857145, 28571.428571428572,
    14285.714285714286, 7142.857142857143, 3571.4285714285716, 1785.7142857142858,
    892.8571428571429, 446.42857142857144, 223.21428571428572, 111.60714285714286
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
            url: 'https://idena.navarra.es/ogc/wmts/ortofoto2024/default/epsg25830deep/{TileMatrix}/{TileRow}/{TileCol}.jpeg',
            layer: 'ortofoto2024',
            matrixSet: 'epsg25830deep',
            format: 'image/jpeg',
            projection: projection!,
            tileGrid: tileGrid,
            style: 'default',
            attributions: '© Gobierno de Navarra',
            crossOrigin: 'anonymous',
            requestEncoding: 'REST',
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
        minHeight: 400,
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />
  );
};

export default OpenLayersMap;