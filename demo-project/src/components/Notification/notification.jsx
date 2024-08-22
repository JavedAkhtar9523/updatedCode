import React, { useEffect, useState } from "react";
import "./notification.css";
import { VscVerifiedFilled } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../actions/commentAction";

const NotificationCard = ({ name, avatar }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedContent = "You have a new notification.";

  return (
    <div className="notification-card mt-2">
      <img src={avatar} alt={`${name}'s avatar`} />
      <div className="notification-content">
        <span className="title"> {name} </span>
        <VscVerifiedFilled className="circle-icons" />
        <p>
          {isExpanded ? "You Got Some important things" : truncatedContent}
          <span onClick={handleToggle} className="toggle-link text-primary">
            {isExpanded ? " show less" : " see more"}
          </span>
        </p>
      </div>
    </div>
  );
};

function Notification() {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div className="cards p-2 bg-white shadow-sm">
      <div className="heading d-flex justify-content-between align-items-center p-3">
        <p>Notification</p>
        <div className="icon">
          <i className="bi bi-gear"></i>
        </div>
      </div>
      <div className="notification-list">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {notifications &&
          notifications?.length > 0 &&
          notifications?.map((item, index) => (
            <div key={item._id} className="notification-item">
              <NotificationCard
                name={item?.sender?.name}
                avatar={item?.sender?.avatar}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Notification;
