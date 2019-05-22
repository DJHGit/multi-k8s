import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
        <h3>This is the other page</h3>
      <Link to="/">Back to home page</Link>
    </div>
  );
};
