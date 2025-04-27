import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth-context';

const ProtectedComponent = () => {
  const [protectedData, setProtectedData] = useState(null);
  const { fetchWithAuth } = useAuth();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const response = await fetchWithAuth('http://13.60.28.234:4000/protected');

      if (response.ok) {
        const data = await response.json();
        setProtectedData(data);
      } else {
        console.error('Failed to fetch protected data', response.status);
      }
    };

    fetchProtectedData();
  }, [fetchWithAuth]);

  return (
    <div>
      <h1>Protected Data</h1>
      {protectedData ? (
        <pre>{JSON.stringify(protectedData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProtectedComponent;
