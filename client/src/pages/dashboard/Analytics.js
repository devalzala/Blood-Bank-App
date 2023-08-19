import React, { useEffect, useState } from "react";
import Header from "../../components/Shared/Layout/Header";
import { useQuery } from "react-query";
import API from "../../services/API";
import Spinner from "../../components/Shared/Spinner";
import { useQueries } from "react-query";
import moment from "moment";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  const getAnalyticsRecords = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");

      if (data && data.success) {
        setAnalyticsData(data && data.bloodGroupData);
      }
    } catch (error) {
      console.log(error, "error in getAnalyticsRecords");
    }
  };

  useEffect(() => {
    getAnalyticsRecords();
  }, []);

  const getInventoryData = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");

      if (data && data.success) {
        setInventoryData(data && data.inventory);
      }
    } catch (error) {
      console.log(error, "error in getInventoryData");
    }
  };

  useEffect(() => {
    getInventoryData();
  }, []);

  const colors = [
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];

  // if (isLoading || inventoryLoading) return <Spinner />;

  // if (error || inventoryError) return "An error has occurred: " + error.message;

  return (
    <>
      <Header />
      <h1 className="text-center mt-2 pb-2 border-bottom border-dark">
        Analytics Page
      </h1>

      <div className="d-flex flex-row flex-wrap">
        {analyticsData &&
          analyticsData.map((data, index) => {
            return (
              <div
                className="card m-4 p-1"
                style={{
                  width: "20rem",
                  backgroundColor: `${colors[index]}`,
                  color: "#ffff",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title text-center">{data?.bloodGroup}</h5>
                  <p className="card-text">
                    Total In: <b>{data?.totalIn} (ML)</b>
                  </p>
                  <p className="card-text">
                    Total Out: <b>{data?.totalOut} (ML)</b>
                  </p>
                </div>

                <div className="card-footer text-light bg-dark text-center">
                  Total Available: <b>{data?.availableBlood} (ML)</b>
                </div>
              </div>
            );
          })}
      </div>

      <h1 className="text-center mt-2 pb-2 border-top border-bottom border-dark">
        Recent Blood Transactions
      </h1>

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
        {inventoryData &&
          inventoryData.map((i) => {
            return (
              <tbody key={i._id}>
                <tr>
                  <th scope="row">{i?.bloodGroup}</th>
                  <td>{i?.inventoryType}</td>
                  <td>{i?.quantity} (ML)</td>
                  <td>{i?.email}</td>
                  <td>{moment(i?.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </>
  );
};

export default Analytics;
