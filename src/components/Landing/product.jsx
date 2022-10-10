import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {AddButton} from '../buttons/Add'
import { RemoveButton} from '../buttons/Remove'

// import Modal from 'react-bootstrap/Modal';

export const Product = (props) => {
  const { id, locationCode, cfa_code } = props; // console.log(props)

  const tokendata = JSON.parse(localStorage.getItem("persist:root"));
  let token = tokendata.partData;
  let tokStr = JSON.parse(token).token;

  const data1 = JSON.parse(localStorage.getItem("cart")) || [];

  const [cart, setCart] = useState(data1);
  const [productData, setProductData] = useState([]);
  const [search, setSearch] = useState("a");
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState("");
  const debouncedSearch = useDebounce(search, 150);

  useEffect(() => {
    function fetchData() {
      setProductData([]);
      setLoading(true);
      console.log("useEffect called ")
if(locationCode,tokStr,cfa_code,id){
console.log("called again")
  axios
  .get(
    `https://alkemapi.indusnettechnologies.com/api/product/all_product_list/E/${cfa_code}?dist_id=${id}&page=1&sv=&div_code=${locationCode}&product_nm=${debouncedSearch}`,
    { headers: { Authorization: `Bearer ${tokStr}` } }
  )
  .then((res) => {
    // setNotices(response.data.hits);
    setLoading(false);
    console.log(res.data.data);
    setProductData(res.data.data);
  });
}
else {
  return 
}
}
    if (debouncedSearch) fetchData();
  }, [debouncedSearch, id, locationCode, tokStr, cfa_code]);

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

  useEffect(() => {
    setTimeout(() => {
      setError("Not Found");
    }, 5000);
    setError("Loading...");
  }, [loading, id]);

  const [clickedIndex, setClickedIndex] = useState({});

  const handleClick = (el, index) => () => {
    setCart([...cart, el]);
    setClickedIndex((prev) => ({
      ...prev,
      [index]: !prev[index],
    })); // console.log(clickedIndex[index]);
  };

  useEffect(() => {
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    const data = JSON.parse(localStorage.getItem("cart"));
    console.log("data", data);
  }, [cart]);
  return (
    <>
      {" "}
      <div>
        {" "}
        <input
          style={{
            marginLeft: "10px",
            border: "2px solid black",
            padding: "5px",
          }}
          type="search"
          placeholder="Search Product"
          onChange={(e) => setSearch(e.target.value)}
        />
        {" "}
        {productData.length === 0 ? (
          <div>{Error}</div>
        ) : (
          <div
            style={{
              marginTop: "10px",
              "list-style": "none",
              padding: "0 20px 0 20px",
            }}
          >
            {" "}
            {productData.map((el, i) => (
              <div
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  borderRadius: "12px",
                  "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                key={i}
              >
                {" "}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {" "}
                  <div>
                    {" "}
                    <h5>{el.product_name}</h5>{" "}
                  </div>
                  {" "}
                  <div>
                    PTS : Rs {el.ptd}
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {" "}
                  <div>Case Qty : {el.box_case_qty}</div>
                  <div>Unit Qty : {el.inner_qty}</div>
                  <div>Packing : {el.unit_description}</div>
                  {" "}
                  <div>
                    {" "}
                    <div
                      // className="btn btn-warning"
                      onClick={handleClick(el, i)}
                    >

                      {clickedIndex[i] ? <RemoveButton/> : <AddButton/> }
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {" "}
                  <div>Bonus Offers : 18 + 2</div>
                  {" "}
                  <div>
                    {" "}
                    <p style={{ color: "blue" }}>More Details</p>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
            ))}
            {" "}
          </div>
        )}
        {" "}
      </div>
      {" "}
    </>
  );
};
