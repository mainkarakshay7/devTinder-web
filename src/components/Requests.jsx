import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      if (res.data.data) {
        dispatch(addRequests(res.data.data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const respondRequest = async (action, id) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${action}/${id}`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }

    dispatch(removeRequest(id));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  
  return (
    <div className="flex flex-col justify-center text-center mt-10">
      <h1 className="font-bold text-3xl">Connection Requests</h1>

      <div className="flex flex-col gap-4 mt-10">
        {requests?.map((request, index) => {
          const { firstName, lastName, age, gender, photoUrl } =
            // eslint-disable-next-line no-unsafe-optional-chaining
            request?.fromUserId;
          return (
            <div
              className="card card-side bg-base-300 shadow-sm max-h-36 max-w-lg m-auto flex p-4"
              key={index}
            >
              <figure className="w-1/3">
                <img src={photoUrl} alt="user" />
              </figure>
              <div className="card-body flex">
                <h2 className="card-title">
                  {firstName + " " + lastName + ", " + age + ", " + gender}
                </h2>
                <div className="card-actions justify-items-start">
                  <button
                    className="btn btn-secondary"
                    onClick={async () =>
                      await respondRequest("accepted", request._id)
                    }
                  >
                    Interested
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={async () =>
                      await respondRequest("rejected", request._id)
                    }
                  >
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
