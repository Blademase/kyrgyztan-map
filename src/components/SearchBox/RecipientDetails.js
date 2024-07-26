import React, { useRef, useEffect, useState } from 'react';
import './RecipientDetails.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const RecipientDetails = ({ recipient }) => {
  const mapRef = useRef();
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.leafletElement.invalidateSize();
    }
    if (recipient && recipient.id) {
      fetchPaymentHistory(recipient.id);
    }
  }, [recipient]);

  const fetchPaymentHistory = async (id) => {
    try {
      const response = await axios.get(`https://inter-map.onrender.com/api/recipient/get_recipient_payment_history/${id}`);
      setPaymentHistory(response.data);
    } catch (error) {
      console.error('Error fetching payment history:', error);
      setPaymentHistory([]);
    }
  };

  if (!recipient) {
    return <div>Загрузка...</div>;
  }

  const {
    first_name,
    second_name,
    third_name,
    pin,
    address = {},
    payment_sum,
    payment_status = {},
    nationality = {},
    gender = {},
    date_of_birth,
    relative = []
  } = recipient;

  const { latitude, longitude, photo } = address;
  const typeOfrelative =(relative)=>{
if (relative===1){return "Сын"} else {return "Дочь"}
  }
  return (
    <div className="recipient-details">
      <h2>Детали получателя</h2>
      <div><strong>ФИО:</strong> {first_name} {second_name} {third_name}</div>
      <div><strong>ПИН:</strong> {pin}</div>
      <div><strong>Область:</strong> {address.region || 'N/A'}</div>
      <div><strong>Город:</strong> {address.city || 'N/A'}</div>
      <div><strong>Сумма платежа:</strong> {payment_sum}</div>
      <div><strong>Статус платежа:</strong> {payment_status ? payment_status.name_ru : 'N/A'}</div>
      <div><strong>Национальность:</strong> {nationality ? nationality.name_ru : 'N/A'}</div>
      <div><strong>Пол:</strong> {gender ? gender.name_ru : 'N/A'}</div>
      <div><strong>Дата рождения:</strong> {date_of_birth}</div>
      {photo && <div><strong>Фото:</strong><img src={photo} alt="Address Photo" style={{ width: '100%', maxHeight: '300px' }} /></div>}
      {latitude && longitude && (
        <div>
          <strong>Карта:</strong>
          <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '300px', width: '100%' }} whenCreated={mapInstance => { mapRef.current = mapInstance; }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]} />
          </MapContainer>
        </div>
      )}
      <h3>Родственники:</h3>
      {relative.length > 0 ? (
        relative.map((rel) => (
          <div key={rel.id}>
            <strong>ФИО:</strong> {rel.first_name} {rel.second_name} {rel.third_name}<br />
            <strong>ПИН:</strong> {rel.pin}<br />
            <strong>Дата рождения:</strong> {rel.date_of_birth}<br />
            <strong>Родственник:</strong> {typeOfrelative(rel.relative_type) || 'N/A'}<br /><br />
          </div>
        ))
      ) : (<div>Нет родственников</div>)}
      <h3>История платежей:</h3>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map(payment => (
            <tr key={payment.created_date}>
              <td>{payment.created_date}</td>
              <td>{payment.payment_sum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipientDetails;
