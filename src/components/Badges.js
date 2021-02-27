import React from "react";
import {GiAbstract013} from 'react-icons/gi'

function Badges(props) {

  const {size, noOfSubmits} = props;

  const returnBadgeSymbol = (noOfBadges, color) => {
    return Array(noOfBadges).fill( <GiAbstract013 size={size} color={color} />)
  }

  const BADGE_5 = "#2f2f2f";
  const BADGE_10 = "#8b0909"; 
  const BADGE_15 = "#694308";


  return (
    <>
      <div className='badge-div'>
        <li className='badge-item'>
          5+: {returnBadgeSymbol(3, noOfSubmits >= 5 ? BADGE_5 : '')}
        </li>
        <li className='badge-item'>
          10+: {returnBadgeSymbol(5, noOfSubmits >= 10 ? BADGE_10 : '')}
        </li>
        <li className='badge-item'>
          15+: {returnBadgeSymbol(8, noOfSubmits >= 15 ? BADGE_15 : '')}
        </li>
        <li><p> * Add up to stated number of terms to unlock badge</p></li>
      </div>
    </>
  );
}

export default Badges;
