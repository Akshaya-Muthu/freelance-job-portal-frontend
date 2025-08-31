import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth';

export const UserNavigate = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // clears user & localStorage
    navigate('/login'); // redirect to login page
  };

  return (
    <div className="absolute top-16 right-4 w-64 bg-gray-800 rounded-xl shadow-xl p-4 flex flex-col gap-2 z-50 md:right-10">
      <Link
        to={`/user/${user?.name}`}
        className="text-white text-lg py-2 px-4 rounded hover:bg-gray-700 transition duration-200 text-center"
      >
        Profile
      </Link>

      {user?.role === "recruiter" ? (
        <Link
          to="/admindashboard"
          className="text-white text-lg py-2 px-4 rounded hover:bg-gray-700 transition duration-200 text-center"
        >
          My Applications 
        </Link>
      ) : (
        <Link
          to="/myApplication"
          className="text-white text-lg py-2 px-4 rounded hover:bg-gray-700 transition duration-200 text-center"
        >
          My Applications
        </Link>
      )}

      <Link
        to="/save-jobs"
        className="text-white text-lg py-2 px-4 rounded hover:bg-gray-700 transition duration-200 text-center"
      >
        Saved Jobs
      </Link>

      <button
        onClick={handleLogout} // <-- use the new handler
        className="text-red-500 text-lg py-2 px-4 rounded hover:text-red-600 hover:bg-gray-700 transition duration-200 text-center"
      >
        Log Out
      </button>
    </div>
  );
};
