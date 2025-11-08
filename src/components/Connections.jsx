import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      if (res.data.data) {
        dispatch(addConnections(res.data.data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex flex-col justify-center text-center mt-10">
      <h1 className="font-bold text-3xl">Connections</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {connections?.map((connection, index) => {
          const { firstName, lastName, age, gender, photoUrl, about, _id } =
            connection;
          return (
            <div
              className="flex justify-center card bg-base-100 w-80 shadow-sm m-auto my-10 max-h-[450px]"
              key={index}
            >
              <figure>
                <img src={photoUrl} alt="user" />
              </figure>
              <div className="card-body text-left flex justify-items-start">
                <h2 className="card-title">
                  {firstName + " " + lastName + ", " + age + ", " + gender}
                </h2>
                <p className="flex text-left">{about}</p>
                <div className="card-actions justify-center">
                  <Link to={"/chat/" + _id}>
                    <button className="btn btn-primary">Chat</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
