import { GeoJSONLayer, VcsApp, VcsModule, Viewpoint } from '@vcmap/core';
import { Component } from 'react';
import './VcMapComponent.css';
import { v4 as uuidv4 } from 'uuid';

type VcMapComponentProps = {
  geoJSON: string;
}

class VcMapComponent extends Component<VcMapComponentProps> {
  mapId = uuidv4();

  async loadModule(app: VcsApp, url: string) {
    const config = await fetch(url).then(response => response.json());
    const module = new VcsModule(config);
    await app.addModule(module);
  }

  async zoomToAll(layer: GeoJSONLayer, vcsApp: VcsApp) {
    if (layer.getFeatures().length > 0) {
      const extent = layer.getZoomToExtent();
      let viewpoint;
      if (extent){
        viewpoint = Viewpoint.createViewpointFromExtent(extent);
      }
      if (viewpoint && vcsApp.maps.activeMap) {
        await vcsApp.maps.activeMap.gotoViewpoint(viewpoint);
      }
    }
  }

  async componentDidMount() {
    const vcsApp = new VcsApp();
    vcsApp.maps.setTarget(this.mapId);
    await this.loadModule(vcsApp, new URL('./../../simple-config.json', window.location.href).toString());
    const geoJSONUrl = new URL(this.props.geoJSON, window.location.href).toString();
    const layer = new GeoJSONLayer({ url:geoJSONUrl });
    vcsApp.layers.add(layer);
    await layer.activate();
    await this.zoomToAll(layer, vcsApp);
    console.log(vcsApp);
  }

  render() {
    return <div className="myMapContainer">
      <div id={this.mapId}/>
    </div>;
  }
}

export default VcMapComponent;
