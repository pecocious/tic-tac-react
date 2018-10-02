import React from 'react';

const Square = (props) => {
  return(
    <button className={props.data.class} onClick={props.onClick}>
      {props.data.value}
    </button>

  )
}

export default Square;
