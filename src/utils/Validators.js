export default function validator(userDetails){
    const{firstname,lastname,email,phonenumber,city,state,pinnumber,locality}=userDetails;
    if([firstname,lastname,email,phonenumber].every((field)=>field?.trim()==="" || field?.trim()===null)){
        return [true,"All","required"];
    }else if(!firstname){
        return [true,"firstname","invalid"];
    }else if(!firstname.match(/^[a-zA-Z\s]+$/) || firstname==="undefined" || firstname==="null"){
        return [true,"firstname","missmatched"];
    }else if(!lastname){
        return [true,lastname,"invalid"];
    }else if(!lastname.match(/^[a-zA-Z]+$/) || lastname==="undefined" || lastname==="null"){
        return [true,"lastname","missmatched"];
    }else if(!email){
        return [true,"email","invalid"];
    }else if (!email.match(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,3}$/) || email==="undefined" || email==="null") {
        return [true,"email","missmatched"];
    }else if(!phonenumber){
        return [true,"phonenumber","invalid"];
    }else if(!phonenumber.match(/^[\d]{10}$/) || phonenumber==="undefined" || phonenumber==="null"){
        return [true,"phonenumber","missmatched"];
    }else if(!city){
        return [true,"city","invalid"];
    }else if(!city.match(/^[a-zA-Z\s]+$/) || city==="undefined" || city==="null"){
        return [true,"city","missmatched"];
    }else if(!state){
        return [true,"state","invalid"];
    }else if(!state.match(/^[a-zA-Z\s,]+$/) || state==="undefined" || state==="null"){
        return [true,"state","missmatched"];
    }else if(!pinnumber){
        return [true,"pinnumber","invalid"];
    }else if(!pinnumber.match(/^[\d]{6}$/) || pinnumber==="undefined" || pinnumber==="null"){
        return [true,"pinnumber","missmatched"];
    }else if(locality==="undefined" || locality==="null"){
        return [true,"locality","missmatched"];
    }else{
        return [false,"",""];
    }
}