import React from 'react';
import { useAuth } from '../context/AuthContext';
import ClientDashboard from '../pages/client/ClientDashboard';
import ServiceProviderDashboard from '../pages/service_provider_form/dashboard/service_provider_dashboard';
import { useParams } from 'react-router-dom';

// Add normalizeUserType helper (if not imported)
function normalizeUserType(userType?: string): string | undefined {
  if (!userType) return userType;
  switch (userType) {
    case 'makeup_artist':
      return 'makeupArtist';
    case 'event_organizer':
      return 'eventOrganizer';
    // Add other mappings if needed
    default:
      return userType;
  }
}

const RoleBasedDashboard: React.FC = () => {
  const { user } = useAuth();
  const { tab } = useParams();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // Map backend userType to frontend role
  const userRole = normalizeUserType(user.userType || user.role);
  
  switch (userRole) {
    case 'client':
      return <ClientDashboard initialTab={tab} />;
    case 'photographer':
    case 'makeupArtist':
    case 'decorator':
    case 'venue':
    case 'caterer':
    case 'eventOrganizer':
    case 'event_organizer':
      return <ServiceProviderDashboard />;
    default:
      // Fallback to client dashboard for unknown roles
      console.warn(`Unknown user role: ${userRole}, falling back to client dashboard`);
      return <ClientDashboard initialTab={tab} />;
  }
};

export default RoleBasedDashboard; 