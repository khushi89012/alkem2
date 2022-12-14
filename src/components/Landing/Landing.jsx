import { useNavigate } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Division } from './Division'
import { Location } from './Location'
import { Product } from './product.jsx'
import Topnav from './Navbar'

export const Landing = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const tokendata = JSON.parse(localStorage.getItem("persist:root"))
  let token = tokendata.partData;
  let tokStr = JSON.parse(token).token

  const [data, setData] = useState([])

  const [search, setSearch] = useState("a");
const debouncedSearch = useDebounce(search, 150);

useEffect(() => {
function fetchData() {
    setData([]);

  axios.get(`https://alkemapi.indusnettechnologies.com/api/distributor/distributor_list/E?dn=${debouncedSearch}&page_no=1`, { headers: { "Authorization": `Bearer ${tokStr}` } })
    .then(res => {
      // setNotices(response.data.hits);
      console.log(res.data.data)
      setData(res.data.data)
    });
}
  if (debouncedSearch) fetchData();
}, [debouncedSearch, tokStr ]);

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}


  // async function getData(tokStr) {
  //   await axios.get(api, { headers: { "Authorization": `Bearer ${tokStr}` } })
  //     .then((res) => {
  //       // console.log(res.data.data)
  //       setData(res.data.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }


  const handleClick = () => {
    localStorage.clear()
    navigate("/")
  }


  const [distributor, setDistributor] = useState("")
  const changedValue = (e) => {
    console.log("e.data>>>", e.target)
    setDistributor(e.target.value)
    handleClose()
    setName(e.target.name)
  }

  const handleClear = ()=>{
    setDistributor("")
    setName("")

  }






  return <div>
    <Topnav logout={handleClick} />
    <br></br>
    <div >
   <div style={{ "display": "flex"}}>
          <select style={{ "padding": "7px", "marginLeft": "10px", "display":"flex" }} variant="primary" onClick={handleShow}>
      <option> {name ? name : "Select Distributor"} </option>
    </select>

    <button onClick={handleClear}>Clear</button>

    </div>


    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select Distributer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div name="distributor" id="distributor" value={distributor} >
          <input type="search" placeholder="Distributor" 
          onChange={(e) => setSearch(e.target.value)} className="p-2 mb-2" style={{ width: "100%", padding: "5px" }} />
          {data.map((el, i) => (

            <div className="border p-2">
              <input type="radio" id={el.customer_code} value={el.customer_code} name={el.customer_name} onClick={(e) => changedValue(e)} />
              <label for={el.customer_code}>
                {el.customer_name} - {el.customer_code} ({el.location})
              </label>
            </div>

          ))}

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>


    <Division id={distributor} />
   {/* <Location id={distributor} /> */}
    {/* <Product id={distributor} /> */}

    </div>
 

  </div>
}














































