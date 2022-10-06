import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Login, Token } from '../Redux/action.js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';





export const Location = ({ id }) => {
    const [show, setShow] = useState(false);
    let product = {}
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const tokendata = JSON.parse(localStorage.getItem("persist:root"))
    let token = tokendata.partData;
    let tokStr = JSON.parse(token).token


    const [locationCode, setLocationCode] = useState("")
    const [locationData, setLocationData] = useState([])

    async function getLocationCode(id, tokStr,locationCode){
        await axios.get("https://alkemapi.indusnettechnologies.com/api/feed/dist_divisions/E?dist_id=" + id, { headers: { "Authorization": `Bearer ${tokStr}` } })
            .then((res) => {
                console.log("this is distributer data for second input feild ", res.data.data)

                setLocationCode(res.data.data[0].division_code)
                console.log(locationCode)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        if(id > 0 ){
            getLocationCode(id, tokStr,locationCode)
        }
   
    }, [id, tokStr,locationCode])

    const [name, setName] = useState("");

    async function getData(id, locationCode, tokStr){
        await axios.get(`https://alkemapi.indusnettechnologies.com/api/feed/dist_depot/E?dist_id=${id}&dc=${locationCode}`, { headers: { "Authorization": `Bearer ${tokStr}` } })
            .then((res) => {
                console.log(res.data.data)
                // setData(res.data.data)
                setLocationData(res.data.data)
                setName(res.data.data[0].location_name)

            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        if(id > 0 && locationCode){
            getData(id, locationCode, tokStr)
        }
     
    }, [id, locationCode, tokStr])



    return <>

        <select style={{"padding" :"7px","marginLeft":"10px"}} onClick={handleShow}>
            <option>   {name ? name : "Select Divison"}</option>

        </select>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Select Division</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div >
                    <input type="text" placeholder="Select Division" />
                    <div>
                        {locationData ?
                            (<div>
                                {locationData.map(el =>
                                    <div>
                                        <input type="radio" />
                                        <label>{el.location_name}</label>
                                    </div>

                                )}
                            </div>) :
                            (<input type="text" placeholder="enter location" disabled />)}
                    </div>

                </div>


            </Modal.Body>
            
        </Modal>


    </>
}
