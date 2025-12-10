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
  const { user, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <div className='text-center p-4'>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return <div>Profile Page</div>;
};

export default Profile;
