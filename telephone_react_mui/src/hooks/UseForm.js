import { useState } from "react";
import axios from "axios";
import { AUTH_URL } from "../api";

export const UseForm = (getFreshModelObject) => {
  const [Corps, setCorps] = useState(getFreshModelObject);
  const [values, setValues] = useState(getFreshModelObject);
  const [errors, setErrors] = useState({});
  const [Logged, setLogged] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name + " = ", e.target.value);
    setValues({ ...values, [name]: value });
    console.log({ ...values, [name]: value });
  };
  const resetFormContols = () => {
    setValues(getFreshModelObject);
    setErrors({});
  };

  const axiosTestLogin = () => {
    // create a promise for the axios request
    const promise = axios.get(AUTH_URL + "auth/user", {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    return promise
      .then((result) => {
        if (result.status == 200) {
          setLogged(true);
        } else {
          setLogged(false);
        }
        return result;
      })
      .catch((error) => {
        alert(error.status);
        alert("notFound");
        console.error(error);
        setLogged(false);
        return Promise.reject(error);
      });
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormContols,
    Corps,
    setCorps,
    Logged,
    setLogged,
    axiosTestLogin,
    notify,
    setNotify,
  };
};
