"use client"
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('doctor');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState<any>(null);

  const handleSubmit = async () => {
    console.log('Submitting login with', { email, password, userType }); // Add this to debug input values
    try {
      const response = await fetch('https://dz-tabib-backend.vercel.app/login', {
        method: 'POST',
     
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          userType,
        }),
      });


      const handleSubmit1 = async () => {
        console.log('Submitting login with', { email, password, userType }); // Add this to debug input values
        try {
          const response = await fetch('https://dz-tabib-backend.vercel.app/set-cookie', {
            method: 'GET',
         
            headers: {
              'Content-Type': 'application/json',
            },
       
          });
//tha was stupid 

      const data = await response.json();
      console.log('Response data:', data); // Add this to debug the server response

      if (response.ok) {
        setResponseData(data);
        setError('');
      } else {
        setError(data.message || 'Login failed');
        setResponseData(null);
      }
    } catch (err) {
      console.error('Error during fetch:', err); // Log any fetch error
      setError('An error occurred. Please try again.');
      setResponseData(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black bg-black p-4">
      <h1 className="text-3xl font-semibold mb-4">Login</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex flex-col w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">Password:</label>
          <input
         
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="userType" className="block text-sm font-medium">User Type:</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="doctor">doctor</option>
            <option value="patient">patient</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </div>

      <button
          onClick={handleSubmit1}
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          set cookie
        </button>

      {/* Display the response data */}
      {responseData && (
        <div className="mt-4 p-4 bg-gray-200 rounded-md w-full max-w-lg">
          <h2 className="font-semibold">Response from Server:</h2>
          <pre className="text-sm text-gray-700">{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
