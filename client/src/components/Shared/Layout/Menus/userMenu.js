import { MdOutlineInventory2 } from "react-icons/md";
import { GiHospital } from "react-icons/gi";
import { VscOrganization } from "react-icons/vsc";

export const userMenu = [
  {
    name: "Inventory",
    path: "/",
    icon: <MdOutlineInventory2 />,
  },
  {
    name: "Donar",
    path: "/donar",
    icon: <i className="fa-solid fa-hand-holding-medical" />,
  },
  {
    name: "Hospital",
    path: "/hospital",
    icon: <GiHospital />,
  },
  {
    name: "Organization",
    path: "/organization",
    icon: <VscOrganization />,
  },
];
