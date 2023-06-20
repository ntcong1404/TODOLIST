import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./Read.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function Read() {
  const { id } = useParams();

  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/read/" + id)
      .then((res) => {
        setStudent(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <h1 className={cx("title")}>Student Detail</h1>
        <div className={cx("list")}>
          <h3 className={cx("item")}>{student.ID}</h3>
          <h3 className={cx("item")}>{student.Name}</h3>
          <h3 className={cx("item")}>{student.Email}</h3>
        </div>
        <div className={cx("button")}>
          <Link className={cx("btn")} to={"/"}>
            Back
          </Link>
          <Link className={cx("btn")} to={`/edit/${student.ID}`}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Read;
