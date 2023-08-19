import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Shared/Spinner";
import { toast } from "react-toastify";
import Layout from "../components/Shared/Layout/Layout";
import Modal from "../components/Shared/modal/Modal";
import API from "../services/API";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");

      if (data && data.success) {
        setData(data && data.inventory);
      }
    } catch (error) {
      console.log(error, "error in getBloodRecords");
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <Layout>

      {user && user.role === "admin" && navigate("/admin")}

      {error && toast.error(error)}

      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            type="button"
            className="btn btn-primary ms-3 mt-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="fa-solid fa-plus text-danger" /> Add Inventory
          </button>

          <div className="container">
            <table className="table container mt-4">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Donar Email</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              {data &&
                data.map((i) => {
                  return (
                    <tbody key={i._id}>
                      <tr>
                        <th scope="row">{i?.bloodGroup}</th>
                        <td>{i?.inventoryType}</td>
                        <td>{i?.quantity} (ML)</td>
                        <td>{i?.email}</td>
                        <td>
                          {moment(i?.createdAt).format("DD/MM/YYYY hh:mm A")}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
          <Modal />
        </>
      )}
    </Layout>
  );
};

export default Home;
