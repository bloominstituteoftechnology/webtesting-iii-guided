import React from 'react';

function Speaker(props) {
  return (
    <>
      <button onClick={props.speak}>Speak</button>
      <div>{props.message}</div>
    </>
  );
}
export default Speaker;
