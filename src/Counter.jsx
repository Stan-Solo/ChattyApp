import React, {Component} from 'react';

//Counter component, which displays the amount of users currently online
function Counter ({ msg }) {
  return (
      <span className="message-content" id="counter">{msg}</span>
  );
}
export default Counter;
    