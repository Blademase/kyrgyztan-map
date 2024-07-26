import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegionCard.css';

const RegionCard = ({ region }) => {
  const [allData, setAllData] = useState([]);
  const [details, setDetails] = useState(null);


    const sampleData = [
      { region: 1, recipient_count: 0, relative_count: 0, recipient_male_count: 0, recipient_female_count: 0, relative_position_count: 0, payment_sum: 0 },
      { region: 2, recipient_count: 0, relative_count: 0, recipient_male_count: 0, recipient_female_count: 0, relative_position_count: 0, payment_sum: 0 },
      { region: 3, recipient_count: 0, relative_count: 0, recipient_male_count: 0, recipient_female_count: 0, relative_position_count: 0, payment_sum: 0 },
      { region: 4, recipient_count: 0, relative_count: 0, recipient_male_count: 0, recipient_female_count: 0, relative_position_count: 0, payment_sum: 0 },
      { region: 5, recipient_count: 2, relative_count: 6, recipient_male_count: 2, recipient_female_count: 0, relative_position_count: 2, payment_sum: 2000 },
      { region: 6, recipient_count: 0, relative_count: 0, recipient_male_count: 0, recipient_female_count: 0, relative_position_count: 0, payment_sum: 0 },
      { region: 7, recipient_count: 0, relative_count: 0, recipient_male_count: 0, recipient_female_count: 0, relative_position_count: 0, payment_sum: 0 },
      { region: 8, recipient_count: 0, relative_count: 0, recipient_male_count: 0, recipient_female_count: 0, relative_position_count: 0, payment_sum: 0 },
      { region: 9, recipient_count: 1, relative_count: 1, recipient_male_count: 0, recipient_female_count: 1, relative_position_count: 0, payment_sum: 11111 }
    ];
  


  const handleRegionClick = (regionId) => {
    const regionDetails = allData.find(data => data.region === regionId);
    setDetails(regionDetails);
  };

  console.log(region.id);

  // You can control the rendering logic here based on the details state
  if (region.id=== 1) {
    return (
      <div className="region-card">
        <h2>{region.name} </h2>
        <p>ID: {region.id}</p>
        <div>
          <p>Recipient Count: {sampleData[0].recipient_count}</p>
          <p>Relative Count: {sampleData[0].relative_count}</p>
          <p>Male Recipients: {sampleData[0].recipient_male_count}</p>
          <p>Female Recipients: {sampleData[0].recipient_female_count}</p>
          <p>Positions Count: {sampleData[0].relative_position_count}</p>
          <p>Total Payment Sum: {sampleData[0].payment_sum}</p>
        </div>
      </div>
    );
  }
  if (region.id=== 2) {
    return (
      <div className="region-card">
        <h2>{region.name} </h2>
        <p>ID: {region.id}</p>
        <div>
          <p>Recipient Count: {sampleData[1].recipient_count}</p>
          <p>Relative Count: {sampleData[1].relative_count}</p>
          <p>Male Recipients: {sampleData[1].recipient_male_count}</p>
          <p>Female Recipients: {sampleData[1].recipient_female_count}</p>
          <p>Positions Count: {sampleData[1].relative_position_count}</p>
          <p>Total Payment Sum: {sampleData[1].payment_sum}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="region-card" onClick={() => handleRegionClick(region.id)}>
      <h2>{region.name}</h2>
      <p>ID: {region.id}</p>
      <p>Source: {region.source}</p>
      {details && (
        <div>
          <p>Recipient Count: {details.recipient_count}</p>
          <p>Relative Count: {details.relative_count}</p>
          <p>Male Recipients: {details.recipient_male_count}</p>
          <p>Female Recipients: {details.recipient_female_count}</p>
          <p>Positions Count: {details.relative_position_count}</p>
          <p>Total Payment Sum: {details.payment_sum}</p>
        </div>
      )}
    </div>
  );
};

export default RegionCard;
