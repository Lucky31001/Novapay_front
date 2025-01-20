import React, { useEffect, useState } from 'react';
import api from '../config/api';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await api.me();
                setUser(userData);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                <p className="mb-2"><strong>Username:</strong> {user.username}</p>
                <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            </div>
        </div>
    );
};

export default Profile;