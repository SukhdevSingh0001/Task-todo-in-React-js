import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Card = () => {
  const [Mydata, setMydata] = useState([]);
  const [filtereddata, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(true);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [editValue,setEditvalue]=useState({});
  const[indexValue,Setindex]=useState()
  const cardsPerPage = 9;
  const [reload,setReload]=useState(true);
  useEffect(() => {
    const storedNoteValue = JSON.parse(localStorage.getItem('noteValue')) || [];
    setMydata(storedNoteValue);
     setFilteredData(storedNoteValue.slice(0, 9));
  }, [reload]);

  const paginate = (pageNumber) => {
    const indexOfLastCard = pageNumber * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = Mydata.slice(indexOfFirstCard, indexOfLastCard);
    setFilteredData(currentCards);
    setCurrentPage(pageNumber);
  };
  const handleSearch = (event) => {
    let search = event.target.value;
    let searcheddata = search.length
      ? Mydata.filter((ele) =>
        ele.name.toLowerCase().includes(search.toLowerCase()) ||
        ele.description.toLowerCase().includes(search.toLowerCase()) ||
        ele.date.toLowerCase().includes(search.toLowerCase())
      )
      : Mydata.slice(0, cardsPerPage);
    setFilteredData(searcheddata);
    setCurrentPage(1);
    setShowPagination(search === "");
  };
  const handleEditClick = (index) => {
    Setindex(index)
    setEditvalue(filtereddata[index]);
    setShowEditPanel(true);
  };
  const UpdatedValue = () => {
    setMydata((prevData) => {
      const updatedData = prevData.map((item, currentIndex) => {
        if (currentIndex === indexValue) {
          return { ...item, ...editValue };
        }
        return item;
      });
      Swal.fire({
        icon: 'success',
        title: 'Updated',
        showConfirmButton: false,
        timer: 1000,
      });
      localStorage.setItem('noteValue', JSON.stringify(updatedData));
      setFilteredData(updatedData);
   return updatedData;
    });
    setShowEditPanel(false);
  };
  const handleInputChange = (event, field) => {
    setEditvalue((prevEditValue) => ({
      ...prevEditValue,
      [field]: event.target.value,
    }));
  };
  function deleteValue(index){
   let all = Mydata;
    all.splice(index,1);
    localStorage.setItem('noteValue', JSON.stringify(all));
    setMydata(all);
    setFilteredData(all);
    setReload(!reload);
    Swal.fire({
      icon: 'success',
      title: 'Deleted',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  return (
    <div>
      <div className="search" style={{ display: 'flex', justifyContent: 'center', margin: '8px' }}>
        <input className='search_box' type="search" onChange={handleSearch} placeholder='Search any card....' />
      </div>
      <div className='CardStyle'>
        {filtereddata.map((e, index) => (
          <div className='valueCards' key={index}>
            <div className="flexCard">
              <div className='inputdata' key={index}>
                <p>Name: {e.name}</p>
                <p>Date: {e.date}</p>
                <p>Description: {e.description}</p>
                <div className="btnflex">
                  <button className='buttonstodo' onClick={()=>{handleEditClick(index)}}>Edit</button>
                  <button className='deletebtn' onClick={()=>deleteValue(index)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPagination && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(Mydata.length / cardsPerPage) }).map((_, index) => (
            <span
              className={`spantag ${currentPage === index + 1 ? 'activePage' : ''}`}
              key={index}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </span>
          ))}
        </div>
      )}
      {showEditPanel && (
        <div className="popup-overlay">
          <div className="editPanel-popup">
            <div>
              <div>
                <p htmlFor="">Name</p>
                <input className='input' value={editValue.name || ""}  onChange={(e) => handleInputChange(e, 'name')} type="text" />
              </div>
              <div>
                <p htmlFor="">Date</p>
                <input className='input' value={editValue.date || ""}  onChange={(e) => handleInputChange(e, 'date')} type="date" />
              </div>
              <div>
                <p htmlFor="">Description</p>
                <input className='input' value={editValue.description  || " "} onChange={(e) => handleInputChange(e, 'description')} type="text" />
              </div>
              <div>
                <button onClick={UpdatedValue}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
