import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { useQuery } from "react-query";
import Spinner from "../../components/Shared/Spinner";

const Donar = () => {
  const [donarData, setDonarData] = useState([]);

  // find donar records
  // 👇️ can use the useQuery hook here
  const { isLoading, error } = useQuery({
    queryKey: ["donars"],
    queryFn: async () =>
      await API.get("/inventory/get-donars").then(({ data }) =>
        setDonarData(data && data?.donars)
      ),
  });

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <Layout>
      <h2 className="mt-2 ms-2">Donars List</h2>
      <table className="table container mt-4">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email Id</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        {donarData &&
          donarData.map((i) => {
            return (
              <tbody key={i._id}>
                <tr>
                  <th scope="row">
                    {i?.name || i?.organizationName + "(ORG)"}
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

export default Donar;
