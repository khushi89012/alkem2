import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Login, Token } from '../Redux/action.js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Product} from  './product.jsx'




export const Location = (props) => {
    console.log(props)
    const {id, locationCode } = props
    const [show, setShow] = useState(false);
    const [cfa_Code, setCfa_Code] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const tokendata = JSON.parse(localStorage.getItem("persist:root"))
    let token = tokendata.partData;
    let tokStr = JSON.parse(token).token

    // const [locationCode, setLocationCode] = useState("")
    const [locationData, setLocationData] = useState([])

    const [name, setName] = useState("");
    async function getData(id, locationCode, tokStr){
        await axios.get(`https://alkemapi.indusnettechnologies.com/api/feed/dist_depot/E?dist_id=${id}&dc=${locationCode}`, { headers: { "Authorization": `Bearer ${tokStr}` } })
            .then((res) => {
                console.log(res.data.data)
                // setData(res.data.data)
                setLocationData(res.data.data)
                setCfa_Code(res.data.data[0].cfa_code)
                setName(res.data.data[0].location_name)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        if(id > 0 && locationCode){
            getData(id, locationCode, tokStr)
            setName("")
        }
     
    }, [id, locationCode, tokStr])

if(id === "" && locationCode === ""){
    return (
        <div>
            <input type="text" placeholder="Select Depot" disabled/>
        </div>
    )
}

const handleClear = ()=>{
    setName("");
    setCfa_Code("")
}
    return <>
<div style={{ "display": "flex"}}>
<select style={{"padding" :"7px","marginLeft":"10px"}} onClick={handleShow}>
            <option>   {name ? name : "Select Depot"}</option>
        </select>

    <button onClick={()=>{handleClear()}}>Clear</button>

    </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Select Depot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div >
                    <input type="text" placeholder="Select Depot" />
                    <div>
                        {locationData ?
                            (<div>
                                {locationData.map(el =>
                                    <div>
                                        <input type="radio"  />
                                        <label>{el.location_name}</label>
                                    </div>

                                )}
                            </div>) :
                            (<input type="text" placeholder="enter location" disabled />)}
                    </div>

                </div>


            </Modal.Body>
            
        </Modal>
<Product id={id} locationCode={locationCode} cfa_code={cfa_Code}/>

    </>
}
