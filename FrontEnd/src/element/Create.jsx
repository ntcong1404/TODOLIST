import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";

import styles from "./Create.module.scss";

const cx = classNames.bind(styles);

function Create() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/student", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <h1>Add Student</h1>
        <form onSubmit={handleSubmit}>
          <div className={cx("form-control")}>
            <label>Name</label>
            <input
              className={cx("form-input")}
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className={cx("form-control")}>
            <label>Email</label>
            <input
              className={cx("form-input")}
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <button className={cx("form-btn")}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
