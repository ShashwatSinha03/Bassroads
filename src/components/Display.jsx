import React from 'react';
import Headph from '../components/Headph.jsx';
import Speaker from '../components/Speaker.jsx';
import Earph from '../components/Earph.jsx';
import Soundb from '../components/Soundb.jsx';
import './Display.css';

const Display = () => {
  return (
    <div className="disp">
      <div className="dis1">
        <div className="speaker"><Speaker/></div>
        <div className="soundb"><Soundb/></div>
      </div>
      <div className="dis2">
        <div className="earph"><Earph/></div>
        <div className="headph"><Headph/></div>
      </div>
    </div>
  )
}

export default Display;
