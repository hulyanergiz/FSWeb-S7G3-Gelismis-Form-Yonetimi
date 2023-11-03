import React,{ useState,useEffect} from "react";
import axios from "axios";
import * as yup from 'yup';
const Form=(props)=>{
  const {duzenlenecekUye,editMember, addNewUser } = props;    
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
    const reset = () => {
      setFormData(initialForm)
      setErrors({})
      setIsValid(false)
    }
    
    useEffect(() => {
      console.log("useEffect çalıştı");
      if (duzenlenecekUye) {
        setFormData(duzenlenecekUye);
      }
    }, [duzenlenecekUye]);
const formSchema = yup.object().shape({
    name: yup.string()

    .required("Must include name.")
      .min(3, "Must be at least 3 characters long."),
    email: yup.string()
      .email("Must be a valid email address.")
      .required("Must include email address.").notOneOf(props.users,"Email already registered."),
    password: yup.string()
    .required("Password is Required")
      .matches(/^(?=.*\d)(?=.*[!@#$%^&*-+/:;?<()[{}>.,])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Must include uppercase, lowercase, number, symbol and must be at least 8 chars long."
      )
      ,
    terms: yup.boolean().oneOf(
      [true],
      "You must read and agree to the Terms and Conditions"
    )
  });
  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setIsValid(valid));
  },[formData]);


const changeHandler=(event)=>{
    const name=event.target.name;
const value=event.target.type==="checkbox"? event.target.checked:event.target.value;
    const newFormData={...formData,[name]:value};
    setFormData(newFormData);   


yup.reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [name]: error.errors[0] });
      });
    }
const submitHandler=(event)=>{
    event.preventDefault();
    if (duzenlenecekUye) {
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        editMember(res.data)})
      .catch((error) => {
        console.log(error.response.message);
      });
    setFormData(initialForm);
}else {
  axios.post('https://reqres.in/api/s7g3', formData)
				.then(function (response) {
					console.log(response);
					addNewUser(response.data);
					reset();
				})
				.catch(function (error) {
					console.log(error);
				});

}
}

return (
    <form onSubmit={submitHandler}>
      <h2>Member Registration Form</h2>
        <div>
        <label htmlFor="name">Name:</label>
            <input className="input" onChange={changeHandler} value={formData.name} name="name" type="text" id="name"/>
           {/* <p className="error" data-cy="error">{errors.name}</p> */}
           {errors.name && <p className="error" data-cy="error">{errors.name}</p>}
            </div>
            <div>
            <label htmlFor="email">Email:</label>
            <input className="input" onChange={changeHandler} value={formData.email} name="email" type="email" id="email"/>
            {/* <p className="error" data-cy="error">{errors.email}</p> */}
            {errors.email && <p className="error" data-cy="error">{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password">Password:</label>
            <input className="input" onChange={changeHandler} value={formData.password} name="password" type="password" id="password"/>
            {/* <p className="error" data-cy="error">{errors.password}</p> */}
            {errors.password && <p className="error" data-cy="error">{errors.password}</p>}
            </div>
            <div>
            <label className="terms checkbox" htmlFor="terms">
            <input onChange={changeHandler} checked={formData.terms} name="terms" type="checkbox" id="terms"/>
            I agree <a href="./components/Terms">Terms and Conditions</a></label>
            {/* <p className="error" data-cy="error">{errors.terms}</p> */}
            {errors.terms && <p className="error" data-cy="error">{errors.terms}</p>}
            </div>
            <div>
            {duzenlenecekUye?(<button type="submit">Accept Edit</button>):(<button disabled={!isValid} type="submit">Sign Up</button>)

            }
            </div>
    </form>
)
}
export default Form;

