import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Shared/Layout/Layout";
import { toast } from "react-toastify";
import API from "../../services/API";
import moment from "moment";
import { useQuery } from "react-query";
import Spinner from "../../components/Shared/Spinner";
import { useSelector } from "react-redux";

const OrganizationPage = () => {
  const [organizationData, setOrganizationData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const getOrg = async () => {
    try {
      if (user && user.role === "donar") {
        const { data } = await API.get("/inventory/get-organizations");

        if (data && data.success) {
          setOrganizationData(data?.organizations);
        }
      }

      if (user && user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-organizations-for-hospital"
        );

        if (data && data.success) {
          setOrganizationData(data?.organizations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
  }, [user]);

  // if (isLoading) return <Spinner />;

  // if (error) return "An error has occurred: " + error.message;

  return (
    <Layout>
      <h2 className="mt-2 ms-2">Organizations List</h2>
      <div className="container">
        <table className="table container mt-4">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email Id</th>
              <th scope="col">Phone</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          {organizationData &&
            organizationData.map((i) => {
              return (
                <tbody key={i._id}>
                  <tr>
                    <th scope="row">{i?.organizationName}</th>
                    <td>{i?.email}</td>
                    <td>{i?.phone}</td>
                    <td>{moment(i?.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </Layout>
  );
};

export default OrganizationPage;
