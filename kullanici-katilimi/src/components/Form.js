import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const Form = (props) => {
  const { addMember, editMemberFn, editMember } = props;
  const initialState = editMember || {
    name: "",
    email: "",
    password: "",
    terms: false,
  };
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [roller, setRoller] = useState(["Frontend", "Backend", "DevOps"]);

  const reset = () => {
    setFormData(initialState);
    setFormErrors({});
    setIsFormValid(false);
  };
  useEffect(() => {
    if (editMember) {
      setFormData(editMember);
    }
  }, [editMember]);

  const myFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (editMember) {
      axios
        .post("https://reqres.in/api/s7g3", formData)
        .then(function (response) {
          console.log(response);
          // app.js içindeki state'i güncelle
          editMemberFn(response.data);
          reset();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post("https://reqres.in/api/s7g3", formData)
        .then(function (response) {
          console.log(response);
          // app.js içindeki state'i güncelle
          addMember(response.data);
          reset();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  let yupSchemaPatron = yup.object({
    name: yup
      .string()

      .required("Must include name.")
      .min(3, "Must be at least 3 characters long."),
    email: yup
      .string()
      .email("Must be a valid email address.")
      .required("Must include email address.")
      .notOneOf(["waffle@syrup.com"], "Email already registered."),
    password: yup
      .string()
      .required("Password is Required")
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*-+/:;?<()[{}>.,])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Must include uppercase, lowercase, number, symbol and must be at least 8 chars long."
      ),
    terms: yup
      .boolean()
      .oneOf([true], "You must read and agree to the Terms and Conditions"),
  });

  const validateInput = (name, value) => {
    yup
      .reach(yupSchemaPatron, name)
      .validate(value)
      .then((valid) => {
        console.log("validateInput", valid);
        const newErrors = {
          ...formErrors,
          [name]: null,
        };
        setFormErrors(newErrors);
      })
      .catch((err) => {
        console.log(err.name, err.errors);
        const newErrors = {
          ...formErrors,
          [name]: err.errors[0],
        };
        setFormErrors(newErrors);
      });
  };

  const validateForm = (formData) => {
    yupSchemaPatron
      .isValid(formData)
      .then((valid) => {
        console.log("validateForm", valid);
        setIsFormValid(valid);
      })
      .catch((err) => {
        console.log("validateForm", err.name, err.errors);
        console.log(err);
        setIsFormValid(false);
      });
  };

  const changeHandler = (e) => {
    const { name, value, checked, type } = e.target;

    const inputValue = type === "checkbox" ? checked : value;

    const updatedFormData = {
      ...formData,
      [name]: inputValue,
    };

    setFormData(updatedFormData);

    validateInput(name, inputValue);
    validateForm(updatedFormData);
  };
  return (
    <form onSubmit={myFormSubmit}>
      <div>
        <label htmlFor="name">
          İsim:
          <input
            className="input"
            name="name"
            type="text"
            value={formData.name}
            onChange={changeHandler}
          />
        </label>
        {formErrors.isim && <p>{formErrors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">
          Email:
          <input
            className="input"
            name="email"
            type="email"
            value={formData.email}
            onChange={changeHandler}
          />
        </label>
        {formErrors.isim && <p>{formErrors.email}</p>}
      </div>
      <div>
        <label>
          Rol:
          <select name="rol" value={formData.rol} onChange={changeHandler}>
            <option selected>-</option>
            {roller.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        {formErrors.isim && <p>{formErrors.rol}</p>}
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            className="input"
            name="password"
            type="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </label>
        {formErrors.isim && <p>{formErrors.password}</p>}
      </div>
      <div>
        <input
          name="terms"
          type="checkbox"
          checked={formData.terms}
          onChange={changeHandler}
        />
        <label className="terms" htmlFor="terms">
          I agree <a href="./components/Terms">Terms and Conditions</a>
        </label>
        {formErrors.isim && <p>{formErrors.terms}</p>}
      </div>
      <button onClick={reset} type="button">
        Cancel
      </button>
      <button disabled={!isFormValid} type="submit">
        Sign Up
      </button>
    </form>
  );
};
export default Form;
