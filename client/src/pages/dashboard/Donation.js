import React, { useEffect, useState } from "react";
import Layout from "../../components/Shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { useSelector } from "react-redux";

const Donation = () => {
  const [donationData, setDonationData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  // find donar records
  // 👇️ can use the useQuery hook here
  const getDonations = async () => {
    try {
      const { data } = await API.post("inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",
          donar: user?._id,
        },
      });

      if (data && data.success) {
        setDonationData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonations();
  }, []);

  return (
    <Layout>
      <h2 className="mt-2 ms-2">Donations List</h2>
      <div className="container">
        <table className="table container mt-4">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          {donationData &&
            donationData.map((i) => {
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
      </div>
    </Layout>
  );
};

export default Donation;
