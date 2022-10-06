import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Login, Token } from '../Redux/action.js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';





export const Division = ({ id }) => {

  const [show, setShow] = useState(false);
  const [name, setName] = useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const tokendata = JSON.parse(localStorage.getItem("persist:root"))
  let token = tokendata.partData;
  let tokStr = JSON.parse(token).token
  const division_code = 33;
  // const [locationCode, setLocationCode] = useState("")
  // const [locationData, setLocationData] = useState([])

  const handleClick = () => {
    localStorage.clear()
    navigate("/")
  }



  const [distributor, setDistributor] = useState("")
  const [distributorData, setDistributorData] = useState([])


  const handleChange = (e) => {
    console.log(e.customer_code)
  }

  async function getData(id, tokStr) {
    console.log("xxxxxxxxx", id)
    await axios.get("https://alkemapi.indusnettechnologies.com/api/feed/dist_divisions/E?dist_id=" + id, { headers: { "Authorization": `Bearer ${tokStr}` } })
      .then((res) => {
        console.log("this is distributer data for second input feild ", res.data.data)

        setDistributorData(res.data.data)
        // setLocationCode(res.data.data[0].division_code)
        // console.log(locationCode)
      })
      .catch((err) => {
        console.log(err)
      })
  }



  useEffect(() => {
    if (id > 0) {
      getData(id, tokStr)
    }

  }, [id])

  var handleCheckBox;

  handleCheckBox = (e) => {
    console.log(e.target.value)
    setName(e.target.value)
  }


  return <>

    <select style={{ "padding": "7px", "marginLeft": "10px" }} onClick={handleShow}>
      <option style={{ "width": "15px" }}>

        {name ? name : "Select Depot"}
      </option>

    </select>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Division</Modal.Title>



      </Modal.Header>
      <Modal.Body>
        <div >
          <input type="search" placeholder="Select Depot" className="p-2 mb-2" style={{ width: "100%", padding: "5px" }} />
          {distributorData.map((el, i) => (
            <div>
              <input type="checkbox"
                onClick={(e) => { handleCheckBox(e) }}
                value={el.division_name}
                name={el.division_code}

              />
              <label>{el.division_name} - {el.division_code}</label>
            </div>
          ))}
        </div>
        <div>
        </div>


      </Modal.Body>
      <Modal.Footer>

        <Button variant="primary" onClick={handleClose}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}