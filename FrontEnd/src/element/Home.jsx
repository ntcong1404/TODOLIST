import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/delete/" + id)
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={cx("wrapper ")}>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <div>
            <h1 className={cx("title")}>Student List</h1>
          </div>
          <Link className={cx("create-btn")} to={"/create"}>
            Create +
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th scope="">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((student, index) => (
              <tr key={index}>
                <td>{student.ID}</td>
                <td>{student.Name}</td>
                <td>{student.Email}</td>
                <td className=" ">
                  <Link className={cx("button")} to={`/read/${student.ID}`}>
                    Read
                  </Link>
                  <Link className={cx("button")} to={`/edit/${student.ID}`}>
                    Edit
                  </Link>
                  <button
                    className={cx("button")}
                    onClick={() => handleDelete(student.ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
