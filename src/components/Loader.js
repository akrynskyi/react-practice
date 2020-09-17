import React from 'react';

export const Loader = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary m-5" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};