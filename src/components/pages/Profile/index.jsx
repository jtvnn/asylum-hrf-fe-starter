/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Get the user data from Auth0
 * - Create and style the component
 * - Display the data
 * - Make this page a protected Route
 */
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  // TODO: Replace these with functionality from Auth0
  const { user, isLoading, isAuthenticated, logout } = useAuth0();

  if (isLoading) {
    return <div className='text-center p-4'>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-[60vh]'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-md w-full'>
        <div className='flex flex-col items-center'>
          {user?.picture && <img src={user.picture} alt={user.name} className='w-32 h-32 rounded-full mb-4 border-4 border-blue-500' />}
          <h1 className='text-3xl font-bold mb-2'>{user?.name}</h1>
          <p className='text-gray-600 mb-4'>{user?.email}</p>
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className='mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200'
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
