import React, { useState } from 'react';

const Data = ({ noteValue }) => {
  const [mydata, setdata] = useState(noteValue);

  return (
    <div>
      {Array.isArray(mydata) && mydata.length > 0 ? (
        mydata.map((e, index) => (
          <div key={index}>
            {e.name}
            {/* Render other properties if needed, e.g., {e.date}, {e.description} */}
          </div>
        ))
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
};

export default Data;
