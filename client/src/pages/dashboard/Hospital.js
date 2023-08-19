import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Shared/Layout/Layout";
import { toast } from "react-toastify";
import API from "../../services/API";
import moment from "moment";
import { useQuery } from "react-query";
import Spinner from "../../components/Shared/Spinner";

const Hospital = () => {
  const [hospitalData, setHospitalData] = useState([]);

  // find donar records
  // 👇️ can use the useQuery hook here
  const { isLoading, error } = useQuery({
    queryKey: ["hospitals"],
    queryFn: async () =>
      await API.get("/inventory/get-hospitals").then(({ data }) =>
        setHospitalData(data && data?.hospital)
      ),
  });

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <Layout>
      <h2 className="mt-2 ms-2">Hospitals List</h2>
      <table className="table container mt-4">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email Id</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        {hospitalData &&
          hospitalData.map((i) => {
            return (
              <tbody key={i._id}>
                <tr>
                  <th scope="row">
                    {i?.hospitalName}
                  </th>
                  <td>{i?.email}</td>
                  <td>{i?.phone}</td>
                  <td>{moment(i?.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </Layout>
  );
};

export default Hospital;
