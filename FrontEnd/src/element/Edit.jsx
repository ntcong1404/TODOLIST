import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";

import styles from "./Edit.module.scss";

const cx = classNames.bind(styles);

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [value, setValue] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8081/read/" + id)
      .then((res) =>
        setValue({ ...value, name: res.data[0].Name, email: res.data[0].Email })
      )
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8081/edit/" + id, value)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <h1>Update Student</h1>
        <form onSubmit={handleUpdate}>
          <div className={cx("form-control")}>
            <label>Name</label>
            <input
              className={cx("form-input")}
              type="text"
              placeholder="Enter Name"
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
            />
          </div>
          <div className={cx("form-control")}>
            <label>Email</label>
            <input
              className={cx("form-input")}
              type="email"
              placeholder="Enter Email"
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
            />
          </div>
          <button className={cx("form-btn")}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
