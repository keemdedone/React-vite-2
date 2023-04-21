import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MovieIcon from "@mui/icons-material/Movie";

export const linkItems = [
  {
    name: "Users",
    path: "/",
    icon: <ManageAccountsOutlinedIcon />,
    color: "",
  },
  {
    name: "Mail",
    path: "/mail",
    icon: <MailOutlineIcon />,
    color: "",
  },
  {
    name: "Media",
    path: "/media",
    icon: <MovieIcon />,
    color: "",
  },
];

export const backend_url = "http://localhost:5000";
