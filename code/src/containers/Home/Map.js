import { useVPNSelector } from "@hooks/use-selector";
import React from "react";
import ReactMapGl from "react-map-gl";
import process from "process";

const REACT_APP_MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const REACT_APP_MAP_STYLE = process.env.REACT_APP_MAP_STYLE;

const mapSettings = {
  doubleClickZoom: true,
  dragPan: false,
  dragRotate: false,
  interactive: false,
  maxPitch: 0,
  maxZoom: 20,
  minPitch: 0,
  minZoom: 2.5,
  renderWorldCopies: false,
  touchPitch: false,
  touchZoomRotate: false,
  attributionControl: false,
};

const zoom = [7];

const Map = () => {
  const mapRef = React.useRef();
  const { latitude, longitude } = useVPNSelector();

  React.useEffect(() => {
    if (mapRef.current && mapRef.current.getMap()) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
        duration: 1000,
        essential: true,
        zoom,
      });
    }
  }, [longitude, latitude]);

  const onLoad = React.useCallback(() => {
    const map = mapRef.current.getMap();
    if (map) {
      map.keyboard.disableRotation();
      map.touchZoomRotate.disableRotation();
    }
  }, []);

  const reactMapGl = React.useMemo(() => {
    return (
      <ReactMapGl
        mapLib={import("mapbox-gl")}
        ref={mapRef}
        onLoad={onLoad}
        initialViewState={{
          bearing: 0,
          pitch: 0,
          latitude: latitude,
          longitude: longitude,
          zoom: zoom,
        }}
        style={{
          width: "100%",
          height: `${window.innerHeight - 72}px`,
          overflow: "hidden",
        }}
        cursor="default"
        zoom={zoom}
        mapboxAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle={REACT_APP_MAP_STYLE}
        {...mapSettings}
      />
    );
  }, [latitude, longitude, onLoad]);

  return <>{reactMapGl}</>;
};

export default React.memo(Map);
