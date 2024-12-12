import { useContext } from "react";
import NotificationContext from "../NotificationContext";
const Notification = () => {
  const [notif] = useContext(NotificationContext)
  if (!notif) {
    return null;
  }

  if (notif.isError) {
    return <div className="error">{notif.message}</div>;
  } else {
    return <div className="notification">{notif.message}</div>;
  }
};
export default Notification;
