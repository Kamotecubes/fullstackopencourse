import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector(state => state.notification)
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
