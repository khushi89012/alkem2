const initialState = {
 token:""
};


const logindata = {
   email : '',
   password:'',
  
}



export const loginreducer = (state=logindata,{type, payload})=>{
   
if(type === "LOGIN"){
return {
   ...state,
   email: payload.email,
   password:payload.password
}
}

else {
   return state;
}
}











export const partData = (state = initialState, { type, payload }) => {
   console.log("Token ",payload)
   switch (type) {
      case "TOKEN":
         return {
            ...state,
           token: payload 
         };   
      default:
         return state;
   }
}



