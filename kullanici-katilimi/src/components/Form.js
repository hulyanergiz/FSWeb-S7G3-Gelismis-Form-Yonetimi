import React, { useState } from "react";
const Form = () => {
  const initialState = { name: "", email: "", password: "", terms: false };
  const [formData, setFormData] = useState(initialState);

  return (
    <form>
      <label htmlFor="name">
        İsim:
        <input name="name" type="text" value={formData.name} />
      </label>
      <label htmlFor="email">
        Email:
        <input name="email" type="email" value={formData.email} />
      </label>
      <label htmlFor="password">
        Password:
        <input name="password" type="password" value={formData.password} />
      </label>
      <input name="terms" type="checkbox" checked={formData.terms} />
      <label htmlFor="terms">
        I agree <a href="./components/Terms">Terms and Conditions</a>
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};
export default Form;
