import React,{ useState,useEffect} from "react";
import axios from "axios";
import * as yup from 'yup';
const Form=(props)=>{
    
    const initialForm={
        name:'',
        email:'',
        password:'',
        terms:false
    }
const [formData,setFormData]=useState(initialForm);
const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({name: "",
    email: "",
    password: "",
    terms:""});
const formSchema = yup.object().shape({
    name: yup.string()
      .min(3, "Must be at least 3 characters long.")
      .required("Must include name."),
    email: yup.string()
      .email("Must be a valid email address.")
      .required("Must include email address.").notOneOf([formData.email]),
    password: yup.string()
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*.,/-_+<^$?)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Must include uppercase, lowercase, number, symbol and must be at least 8 chars long."
      )
      .required("Password is Required"),
    terms: yup.boolean().oneOf(
      [true],
      "You must read and agree to the Terms and Conditions"
    )
  });
  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setIsValid(valid));
  }, [formData]);


const changeHandler=(event)=>{
    const name=event.target.name;
const newValue=event.target.type==="checkbox"? event.target.checked:event.target.value;
    const newFormData={...formData,[name]:newValue};
    setFormData(newFormData);   


yup.reach(formSchema, name)
      .validate(newValue)
      .then((valid) => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [name]: error.errors[0] });
      });
    }
const submitHandler=(event)=>{
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        props.addNewUser(res.data)})
      .catch((err) => {
        console.log(err.response.message);
      });
    setFormData(initialForm);
}

return (
    <form onSubmit={submitHandler}>
        <div>
        <label htmlFor="name">Name:</label>
            <input className="input" onChange={changeHandler} value={formData.name} name="name" type="text" id="name"/>
            <p className="error">{errors.name}</p>
            </div>
            <div>
            <label htmlFor="email">Email:</label>
            <input className="input" onChange={changeHandler} value={formData.email} name="email" type="email" id="email"/>
            <p className="error">{errors.email}</p>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
            <input className="input" onChange={changeHandler} value={formData.password} name="password" type="password" id="password"/>
            <p className="error">{errors.password}</p>
            </div>
            <div>
            <input onChange={changeHandler} checked={formData.terms} name="terms" type="checkbox" id="terms"/>
            <label className="terms" htmlFor="terms">I agree <a href="./components/Terms">Terms and Conditions</a></label>
            <p className="error">{errors.terms}</p>
            </div>
            <button disabled={!isValid} type="submit">Sign Up</button>
    </form>
)
}
export default Form;

