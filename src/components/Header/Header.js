import React from 'react';
import { ReactComponent as Gerb } from "../../assets/images/gerb.svg";
import './Header.css';

function Header() {
  return (
    <div className="Header">
      <Gerb className="gerb-icon" />
      <span>Кыргыз Республикасынын,<br/>Эмгек, социалдык камсыздоо жана миграция министрлиги</span>
    </div>
  );
}

export default Header;
