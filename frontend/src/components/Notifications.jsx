import React, { useEffect, useState } from "react";
import { notification } from "antd";

const Notification = () => {
  const [notificationQueue, setNotificationQueue] = useState([]);

  const pushNotification = (message) => {
    setNotificationQueue((prevQueue) => [...prevQueue, message]);
  };

  useEffect(() => {
    if (notificationQueue.length > 0) {
      const [message, ...newQueue] = notificationQueue;
      notification.success({
        message: message,
        onClose: () => {
          setNotificationQueue(newQueue);
        },
      });
    }
  }, [notificationQueue]);

  return null; // Notifications are handled through side effects, no JSX needed
};

export default Notification;
