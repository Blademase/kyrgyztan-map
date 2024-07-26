import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import kyrgyzstanRegions from './KyrgyzstanBorders.json'; // Ensure you have the correct JSON file
import RegionCard from '../RegionCard/RegionCard'; // Import the RegionCard component
import SearchBox from '../SearchBox/SearchComponent'; // Import the SearchBox component
import './MapComponent.css'; // Import the styles

const KyrgyzstanMask = () => {
  const map = useMap();

  useEffect(() => {
    const kyrgyzstanLayer = L.geoJSON(kyrgyzstanRegions);
    const bounds = kyrgyzstanLayer.getBounds();

    map.fitBounds(bounds);

    map.createPane('maskPane').style.zIndex = '700';
  

    map.setMaxZoom(10);

    map.on('zoomend', () => {
      if (map.getZoom() > 9) {
        map.setZoom(9);
      }
      if (map.getZoom() < 5) {
        map.setZoom(5);
      }
    });

    map.dragging.disable();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.touchZoom.disable();
  }, [map]);

  return null;
};

const MapComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const position = [41.2044, 74.7661];

  const filteredRegions = kyrgyzstanRegions; // Use actual filtered data here

  const handleSearch = () => {
    const foundRegion = filteredRegions.features.find(
      (feature) => feature.properties.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundRegion) {
      setSelectedRegion(foundRegion.properties);
    }
  };

  return (
    <div className="container">
      <div className="map-wrapper">
        <MapContainer
          center={position}
          zoom={9}
          minZoom={5}
          maxZoom={9}
          style={{ height: "100vh", width: "100%" }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON
            data={filteredRegions}
            style={(feature) => ({
              fillColor: '#29B6F6',
              fillOpacity: 1,
              color: 'white',
              weight: 1,
            })}
            onEachFeature={(feature, layer) => onEachFeature(feature, layer, setSelectedRegion)}
          />
          <KyrgyzstanMask />
        </MapContainer>
      </div>
      <div className="info-wrapper">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
        {selectedRegion && <RegionCard region={selectedRegion} />}
      </div>
    </div>
  );
};

const onEachFeature = (feature, layer, setSelectedRegion) => {
  if (feature.properties && feature.properties.name) {
    layer.bindTooltip(feature.properties.name, {
      permanent: true,
      direction: "center",
      className: "label-tooltip"
    });
  }

  layer.on({
    mouseover: (e) => {
      const targetLayer = e.target;
      targetLayer.setStyle({
        weight: 3,
        fillOpacity: 1
      });
    },
    mouseout: (e) => {
      const targetLayer = e.target;
      targetLayer.setStyle({
        weight: 1,
        fillOpacity: 1
      });
    },
    click: (e) => {
      setSelectedRegion(feature.properties);
    }
  });
};

export default MapComponent;
