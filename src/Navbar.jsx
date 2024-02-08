import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div className='navbar'>

           <div className='flexCss'>

<ul>
 <Link className='linktag' to="/"><li>Home</li></Link> 
 <Link className='linktag' to="/form"><li>Form</li></Link> 

</ul>
      </div>
      </div>
    </div>
  )
}

export default Navbar
