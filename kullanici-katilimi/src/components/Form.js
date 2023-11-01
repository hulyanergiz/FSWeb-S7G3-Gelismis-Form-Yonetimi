import React, { useState } from "react";
const Form = () => {
  const initialState = { name: "", email: "", password: "", terms: false };
  const [formData, setFormData] = useState(initialState);

  return (
    <form>
      <div>
        <label htmlFor="name">
          İsim:
          <input
            className="input"
            name="name"
            type="text"
            value={formData.name}
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email:
          <input
            className="input"
            name="email"
            type="email"
            value={formData.email}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            className="input"
            name="password"
            type="password"
            value={formData.password}
          />
        </label>
      </div>
      <div>
        <input name="terms" type="checkbox" checked={formData.terms} />
        <label className="terms" htmlFor="terms">
          I agree <a href="./components/Terms">Terms and Conditions</a>
        </label>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};
export default Form;
