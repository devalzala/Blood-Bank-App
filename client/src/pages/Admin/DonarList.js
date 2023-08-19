import React, { useEffect, useState } from "react";
import Layout from "../../components/Shared/Layout/Layout";
import { useQuery } from "react-query";
import API from "../../services/API";
import Spinner from "../../components/Shared/Spinner";
import moment from "moment";
import { toast } from "react-toastify";

const DonarList = () => {
  const [allDonarData, setAllDonarData] = useState([]);
  const [allDonarCount, setAllDonarCount] = useState("");

  // 👇️ can use the useQuery hook here
  const { isLoading, error, refetch } = useQuery({
    queryKey: ["allDonars"],
    queryFn: async () =>
      await API.get("/admin/donar-list").then(({ data }) => {
        return (
          setAllDonarData(data && data?.allDonarsList),
          setAllDonarCount(data && data.totalCount)
        );
      }),
  });

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;

  // Delete Donar
  const handleDelete = async (id) => {
    try {
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      toast.success(data && data.message);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h2 className="mt-2 ms-2">Donars List ({allDonarCount})</h2>
      <table className="table container mt-4">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email Id</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {allDonarData &&
          allDonarData.map((i) => {
            return (
              <tbody key={i._id}>
                <tr>
                  <th scope="row">
                    {i?.name || i?.organizationName + "(ORG)"}
                  </th>
                  <td>{i?.email}</td>
                  <td>{i?.phone}</td>
                  <td>{moment(i?.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(i?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </Layout>
  );
};

export default DonarList;
