import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateMeal = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8000/api/meals`, { name, date })
      .then(() => navigate("/meals"))
      .catch((err) => {
        const errResponse = err.response.data.errors;
        const errArr = [];
        for (const key in errResponse) {
          errArr.push(errResponse[key].message);
        }
        setErrors(errArr);
      });
  };

  return (
    <div>
      <h2 class="m-5">Add Delicacy:</h2>
      <form class="form-control" onSubmit={submitHandler}>
        <div class="row mb-3">
          <label class="col-sm-2 col-form-label">Name: </label>
          <div class="col-sm-8">
            <input
              placeholder="Meal name"
              class="form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div class="row mb-3">
          <label class="col-sm-2 col-form-label">Select Date: </label>
          <div class="col-sm-8">
            <input
              class="form-control"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Link to="/meals">
            <button className="btn-btn light">Cancel</button>
          </Link>{" "}
          <input type="submit" value="Submit" />
        </div>
      </form>
      {errors.map((err, idx) => {
        return <p key={idx}>{err}</p>;
      })}
    </div>
  );
};

export default CreateMeal;
