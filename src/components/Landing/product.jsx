import React from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Login, Token } from '../Redux/action.js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Product = (props) => {
    const { id, locationCode, cfa_code } = props;

    console.log(props)


    const tokendata = JSON.parse(localStorage.getItem("persist:root"))
    let token = tokendata.partData;
    let tokStr = JSON.parse(token).token



    const [productData, setProductData] = useState([])



    useEffect(() => {
        if (id > 0 && locationCode && cfa_code) {
            axios.get(`https://alkemapi.indusnettechnologies.com/api/product/all_product_list/E/${cfa_code}?dist_id=${id}&page=1&sv=&div_code=${locationCode}&product_nm=`, { headers: { "Authorization": `Bearer ${tokStr}` } })

                .then((res) => {
                    console.log(res.data.data)
                    setProductData(res.data.data)

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [id, locationCode, tokStr, cfa_code])

    if (id === "" || locationCode==="" || cfa_code === "") {
        return (
            <div></div>
        )
    }
    else if(productData.length === 0){
        return <>
        

        <h3 className="m-auto text-danger fw-bold">No Record Found !</h3>
        </>
    }

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