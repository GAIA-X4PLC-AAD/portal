/* test coverage not required */
import { GeoJSONLayer, VcsApp, VcsModule, Viewpoint } from '@vcmap/core';
import React, { FC, useEffect } from 'react';
import './Map.module.css';
import { v4 as uuid } from 'uuid';

const Map: FC = () => {
  const mapId = uuid();
  const loadModule = async (app: VcsApp, url: string) => {
    const config = await fetch(url).then(response => response.json());
    const module = new VcsModule(config);
    await app.addModule(module);
  };

  const zoomToAll = async (layer: GeoJSONLayer, vcsApp: VcsApp) => {
    if (layer.getFeatures().length > 0) {
      const extent = layer.getZoomToExtent();
      let viewpoint;
      if (extent) {
        viewpoint = Viewpoint.createViewpointFromExtent(extent);
      }
      if (viewpoint && vcsApp.maps.activeMap) {
        await vcsApp.maps.activeMap.gotoViewpoint(viewpoint);
      }
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const vcsApp = new VcsApp();
        vcsApp.maps.setTarget(mapId);
        await loadModule(vcsApp, new URL('/simple-config.json', window.location.href).toString());
        const geoJSONUrl = new URL('/vienna-streets.geojson', window.location.href).toString();
        const layer = new GeoJSONLayer({ url: geoJSONUrl });
        vcsApp.layers.add(layer);
        await layer.activate();
        await zoomToAll(layer, vcsApp);
        console.log(vcsApp);
      } catch (error) {
        console.error('Error initializing the map:', error);
      }
    };

    initializeMap();
  }, [mapId]);

  return (
    <div className="myMapContainer">
      <div id={mapId} />
    </div>
  );
};

export default Map;
