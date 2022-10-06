import React from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Login, Token } from '../Redux/action.js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Product = ({ id }) => {
    const [show, setShow] = useState(false);
    const [add, setAdd] = useState(1)
    let product = {}
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const tokendata = JSON.parse(localStorage.getItem("persist:root"))
    let token = tokendata.partData;
    let tokStr = JSON.parse(token).token

    const [cfa_Code, setCfa_Code] = useState("")
    const [locationCode, setLocationCode] = useState("")
    const [productData, setProductData] = useState([])
    useEffect(() => {
        if (id > 0) {
            axios.get("https://alkemapi.indusnettechnologies.com/api/feed/dist_divisions/E?dist_id=" + id, { headers: { "Authorization": `Bearer ${tokStr}` } })
                .then((res) => {
                    console.log("this is distributer data for second input feild ", res.data.data)
                    setLocationCode(res.data.data[0].division_code)
                    console.log(locationCode)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [id])

    async function getData(id, locationCode, tokStr) {
        await axios.get(`https://alkemapi.indusnettechnologies.com/api/feed/dist_depot/E?dist_id=${id}&dc=${locationCode}`, { headers: { "Authorization": `Bearer ${tokStr}` } })
            .then((res) => {
                console.log(res.data.data)
                setCfa_Code(res.data.data[0].cfa_code)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        if (id > 0) {
            getData(id, locationCode, tokStr)
        }
    }, [id, locationCode])


    useEffect(() => {
        if (id > 0 && locationCode && cfa_Code) {
            axios.get(`https://alkemapi.indusnettechnologies.com/api/product/all_product_list/E/${cfa_Code}?dist_id=${id}&page=1&sv=&div_code=${locationCode}&product_nm=`, { headers: { "Authorization": `Bearer ${tokStr}` } })
                 
                .then((res) => {
                    console.log(res.data.data)
                    setProductData(res.data.data)

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [id, locationCode, tokStr, cfa_Code])


  
    return <>




        <div >



            {
                (<div style={{ "marginTop": "10px", "list-style": "none", padding: "0 20px 0 20px" }}>
                    {productData.map(el => (
                        <div style={{ "marginTop": "10px", "padding": "10px", "borderRadius": "12px", "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} >
                            <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                                <div>
                                    <h5>{el.product_name}</h5>
                                </div>
                                <div>
                                    PTS : Rs {el.ptd}
                                </div>
                            </div>
                            <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                                <div>Case Qty : {el.box_case_qty}</div>
                                <div>Unit Qty : {el.inner_qty}</div>
                                <div>Packing : {el.unit_description}</div>
                                <div>
                                    <button className="btn btn-warning" >Add</button>
                                </div>
                            </div>
                            <div style={{ "display": "flex", "justifyContent": "space-between" }} >
                                <div>Bonus Offers : 18 + 2</div>
                                <div>
                                    <p style={{ "color": "blue" }}>More Details</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>)}
        </div>
    </>
}
