import React from 'react';
import logo from "../../assets/images/giz-logo.png";
import './Footer.css';

function Footer() {
  return (
    <div className="Footer">
      <div className='FooterContent'>
        <div>
        <img src={logo} alt="GIZ Logo" />
        </div>
        <div>
       © "Санарип Сот" порталы 2022-ж. КР Жогорку соту </div>
        <div><span> &gt;/&lt;адилетсот_</span> </div>
      </div>
    </div>
  );
}

export default Footer;
