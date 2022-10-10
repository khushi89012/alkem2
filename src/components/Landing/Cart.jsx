import React from 'react';
import { useNavigate } from 'react-router'
import {RiDeleteBin6Line} from 'react-icons/ri'
import swal from 'sweetalert';


export default function Cart() {
    const navigate = useNavigate()
    const data1 = JSON.parse(localStorage.getItem("cart"));
    const [data,setData] = React.useState(data1);
    console.log(data)

    // React.useEffect(()=>{
    //     setData(data1)
    // },[data1])

    const handleDelete = async(i) => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this file?",
            icon: "warning",
            dangerMode: true,
          });
           
          if (willDelete) {
            swal("Deleted!", "Your imaginary file has been deleted!", "success");
          }
        let list = [...data];
        list.splice(i, 1);
        setData(list)
       localStorage.setItem("cart", JSON.stringify(list))
    }
  return (
    <div>
        <h1>Cart</h1>
        <button className="btn btn-primary" onClick={()=>{navigate("/landing")}}>Back</button>
        <table className="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th>Product name</th>
                    <th>PTS : Rs</th>
                    <th>QTY</th>
                </tr>
            </thead>
            <tbody>
                {data.map((el,i)=>(
                    <tr key={i}>
                        <td>{el.product_name}</td>
                        <td>PTS : Rs {el.ptd}</td>
                        <td>{el.box_case_qty}</td>
                        <td>
                            <button className="btn btn-danger"  onClick={()=>{handleDelete(i)}}>
                                <RiDeleteBin6Line/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}