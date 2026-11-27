"use client";

import { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New connection request",
      description: "Someone wants to connect with you.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Profile viewed",
      description: "Someone viewed your profile.",
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      title: "Welcome to MyCircle",
      description: "Start connecting with your community.",
      time: "2 days ago",
      read: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, read: true }))
    );
  };

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <section className="notifications-page">
      <div className="notifications-header">
        <div>
          <h2>Notifications</h2>
          <p>You have {unreadCount} unread notifications</p>
        </div>

        <button type="button" onClick={markAllRead}>
          Mark all as read
        </button>
      </div>

      <div className="notifications-list">
        {notifications.map((item) => (
          <article
            key={item.id}
            className={`notification-item ${!item.read ? "unread" : ""}`}
          >
            <div className="notification-content">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <small>{item.time}</small>
            </div>

            {!item.read && (
              <span className="notification-dot" />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
