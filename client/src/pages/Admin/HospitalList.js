import React, { useState } from "react";
import Layout from "../../components/Shared/Layout/Layout";
import API from "../../services/API";
import { toast } from "react-toastify";
import moment from "moment";
import { useQuery } from "react-query";
import Spinner from "../../components/Shared/Spinner";

const HospitalList = () => {
  const [allHospitalData, setAllHospitalData] = useState([]);
  const [allHospitalCount, setAllHospitalCount] = useState("");

  // 👇️ can use the useQuery hook here
  const { isLoading, error, refetch } = useQuery({
    queryKey: ["allHospital"],
    queryFn: async () =>
      await API.get("/admin/hospital-list").then(({ data }) => {
        return (
          setAllHospitalData(data && data?.allHospitalList),
          setAllHospitalCount(data && data.totalCount)
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
      <h2 className="mt-2 ms-2">Hospitals List ({allHospitalCount})</h2>
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
        {allHospitalData &&
          allHospitalData.map((i) => {
            return (
              <tbody key={i._id}>
                <tr>
                  <th scope="row">{i?.hospitalName}</th>
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

export default HospitalList;
