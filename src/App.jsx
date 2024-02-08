import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import Card from './Card';

function App() {
    const navigate = useNavigate();
  const [noteValue, setNoteValue] = useState({
    name: '',
    date: '',
    description: '',
  });
  const [AddValue, SetaddValue] = useState([]);

  function NameValue(e) {
    setNoteValue((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  }

  function DateValue(e) {
    setNoteValue((prevState) => ({
      ...prevState,
      date: e.target.value,
    }));
  }

  function descriptionValue(e) {
    setNoteValue((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  }
  const submitValue = async () => {
    if (!noteValue.name || !noteValue.date || !noteValue.description) {
      await Swal.fire({
        icon: 'error',
        title: 'required fields!',
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    const existingData = JSON.parse(localStorage.getItem('noteValue')) || [];
    const newAddValue = [...existingData, noteValue];
    localStorage.setItem('noteValue', JSON.stringify(newAddValue));
    await Swal.fire({
      icon: 'success',
      title: 'Saved',
      showConfirmButton: false,
      timer: 1000,
    });
    setNoteValue({
      name: '',
      date: '',
      description: '',
    });
    setTimeout(() => {
        navigate('/');
      }, 400);
  };

  return (
    <>
      <div className="container">
        <h1>Add Note</h1>
        <div className="box">
          <div>
            <label htmlFor="">Note Add Name</label>
            <input
            className='input'
              type="text"
              placeholder=" Note Add Name..."
              value={noteValue.name}
              onChange={(e) => {
                NameValue(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Note Add Date</label>
            <input
            className='input'
              type="date"
              placeholder=" Note Add date..."
              value={noteValue.date}
              onChange={(e) => {
                DateValue(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Note Add Description</label>
            <textarea
            className='textarea'
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Note Add Des...."
              value={noteValue.description}
              onChange={(e) => {
                descriptionValue(e);
              }}
            ></textarea>
          </div>
        </div>

     {/* <Link to="/card">   */}
      <button type="submit" onClick={submitValue}>
          Submit
        </button>
        {/* </Link> */}
      </div>
    </>
  );
}

export default App;
