import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import RecipientDetails from './RecipientDetails';
import './SearchComponent.css';

const fetchOptions = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error(`Ошибка при получении данных с ${url}:`, error);
    return [];
  }
};

const SearchComponent = () => {
  const [formValues, setFormValues] = useState({
    payment_status: '',
    nationality: '',
    gender: '',
    region: '',
    city: '',
    township: '',
    village: '',
    relative: '',
    search: '',
    page: '',
    page_size: '',
    territorial_object: '',
    territorial_unit: ''
  });

  const [results, setResults] = useState([]);
  const [referenceData, setReferenceData] = useState({
    city: [],
    gender: [],
    nationality: [],
    region: [],
    territorialObject: [],
    territorialUnit: [],
    township: [],
    village: [],
    relativeType: []
  });

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  useEffect(() => {
    const fetchAllReferences = async () => {
      const city = await fetchOptions('https://inter-map.onrender.com/api/reference/ref_city/');
      const gender = await fetchOptions('https://inter-map.onrender.com/api/reference/ref_gender/');
      const nationality = await fetchOptions('https://inter-map.onrender.com/api/reference/ref_nationality/');
      const region = await fetchOptions('https://inter-map.onrender.com/api/reference/ref_region/');
      const territorialObject = await fetchOptions('https://inter-map.onrender.com/api/reference/ref_territorial_object/');
      const territorialUnit = await fetchOptions('https://inter-map.onrender.com/api/reference/ref_territorial_unit/');
      const township = await fetchOptions('https://inter-map.onrender.com/api/reference/ref_township/');
      const village = await fetchOptions('https://inter-map.onrender.com/api/reference/ref_village/');
      const relativeType = await fetchOptions('https://inter-map.onrender.com/api/reference/ref_relative_type/');
      setReferenceData({ city, gender, nationality, region, territorialObject, territorialUnit, township, village, relativeType });
    };
    fetchAllReferences();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSearchChange = (e, field) => {
    setFormValues({ ...formValues, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = Object.keys(formValues)
      .filter(key => formValues[key] !== '')
      .map(key => `${key}=${formValues[key]}`)
      .join('&');

    try {
      const response = await axios.get(`https://inter-map.onrender.com/api/recipient/recipient/?${query}`);
      setResults(response.data.results);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleDetailsClick = async (id) => {
    try {
      const response = await axios.get(`https://inter-map.onrender.com/api/recipient/recipient/${id}/`);
      setSelectedRecipient(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const renderSelectOptions = (options) => {
    return options.map(option => (
      <option key={option.id} value={option.id}>{option.name_ru}</option>
    ));
  };

  const getRegionNameById = (id) => {
    const region = referenceData.region.find(region => region.id === id);
    return region ? region.name_ru : 'N/A';
  };

  return (
    <div className="search-container">
      <div className='searchBtns'>
      <form onSubmit={handleSubmit} className="search-form">
        <button type="submit">Поиск</button>
      </form>
      <button className="btn" onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}>
        {showAdvancedSearch ? 'Скрыть расширенный поиск' : 'Показать расширенный поиск'}
      </button>
      </div>
      {showAdvancedSearch && (
        <form onSubmit={handleSubmit} className="advanced-search-form">
          <div className="grid-container">
            <div>
              <label>Национальность</label>
              <select name="nationality" value={formValues.nationality} onChange={handleChange}>
                <option value="">Выберите национальность</option>
                {renderSelectOptions(referenceData.nationality)}
              </select>
            </div>
            <div>
              <label>Пол</label>
              <select name="gender" value={formValues.gender} onChange={handleChange}>
                <option value="">Выберите пол</option>
                {renderSelectOptions(referenceData.gender)}
              </select>
            </div>
            <div>
              <label>Область</label>
              <select name="region" value={formValues.region} onChange={handleChange}>
                <option value="">Выберите область</option>
                {renderSelectOptions(referenceData.region)}
              </select>
            </div>
            <div>
              <label>Город</label>
              <select name="city" value={formValues.city} onChange={handleChange}>
                <option value="">Выберите город</option>
                {renderSelectOptions(referenceData.city)}
              </select>
            </div>
            <div>
              <label>Поселок</label>
              <select name="township" value={formValues.township} onChange={handleChange}>
                <option value="">Выберите поселок</option>
                {renderSelectOptions(referenceData.township)}
              </select>
            </div>
            <div>
              <label>Село</label>
              <select name="village" value={formValues.village} onChange={handleChange}>
                <option value="">Выберите деревню</option>
                {renderSelectOptions(referenceData.village)}
              </select>
            </div>
            <div>
              <label>Территориальный объект</label>
              <select name="territorial_object" value={formValues.territorial_object} onChange={handleChange}>
                <option value="">Выберите территориальный объект</option>
                {renderSelectOptions(referenceData.territorialObject)}
              </select>
            </div>
            <div>
              <label>Территориальная единица</label>
              <select name="territorial_unit" value={formValues.territorial_unit} onChange={handleChange}>
                <option value="">Выберите территориальную единицу</option>
                {renderSelectOptions(referenceData.territorialUnit)}
              </select>
            </div>
            <div>
              <label>Родственник</label>
              <select name="relative" value={formValues.relative} onChange={handleChange}>
                <option value="">Выберите родственника</option>
                {renderSelectOptions(referenceData.relativeType)}
              </select>
            </div>
            
          </div>
          <button type="submit">Поиск</button>
        </form>
      )}
      <table className="results-table">
        <thead>
          <tr>
            <th>№</th>
            <th>ФИО</th>
            <th>ПИН</th>
            <th>Область</th>
            <th>Сумма платежа</th>
            <th>Статус платежа</th>
            <th>Подробнее</th>
          </tr>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                placeholder="Поиск по ФИО"
                onChange={(e) => handleSearchChange(e, 'search')}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Поиск по ПИН"
                onChange={(e) => handleSearchChange(e, 'search')}
              />
            </td>
            <td>
              <select onChange={(e) => handleSearchChange(e, 'region')}>
                <option value="">Выберите область</option>
                {renderSelectOptions(referenceData.region)}
              </select>
            </td>
            <td>
              <input
                type="text"
                placeholder="Поиск по Сумма платежа"
                onChange={(e) => handleSearchChange(e, 'payment_sum')}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Поиск по Статус платежа"
                onChange={(e) => handleSearchChange(e, 'payment_status')}
              />
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result.id}>
              <td>{index + 1}</td>
              <td>
                {`${result.first_name} ${result.second_name} ${result.third_name}`}
              </td>
              <td>
                {result.pin}
              </td>
              <td>
                {getRegionNameById(result.address?.region)}
              </td>
              <td>
                {result.payment_sum}
              </td>
              <td>
                {result.payment_status ? result.payment_status.name_ru : 'N/A'}
              </td>
              <td>
                <button className="details-button" onClick={() => handleDetailsClick(result.id)}>Посмотреть</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <RecipientDetails recipient={selectedRecipient} />
      </Modal>
    </div>
  );
};

export default SearchComponent;
