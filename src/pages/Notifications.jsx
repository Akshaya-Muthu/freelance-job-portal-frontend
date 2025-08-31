import { useEffect, useState } from "react";
import axios from "../api/axios";

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const res = await axios.get("/notifications");
    setNotifications(res.data);
  };

  const markRead = async (id) => {
    await axios.put(`/notifications/${id}/read`);
    fetchNotifications();
  };

  useEffect(()=>{ fetchNotifications(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {notifications.map(n=>(
        <div key={n._id} className={`p-3 mb-2 rounded ${n.read ? "bg-gray-700" : "bg-blue-700"}`}>
          <p>{n.message}</p>
          {!n.read && <button onClick={()=>markRead(n._id)} className="bg-green-500 text-white px-2 py-1 rounded mt-1">Mark Read</button>}
        </div>
      ))}
    </div>
  );
};
