import React, { useEffect, useState } from 'react';
import api from '../config/api';

const MyDepots = () => {
  const [depots, setDepots] = useState([]);

  useEffect(() => {
    const fetchDepots = async () => {
      try {
        const depotsData = await api.depots();
        setDepots(depotsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDepots();
    console.log(depots);
  }, [depots]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">My Deposits</h1>
        <ul className="space-y-4">
          {depots.map((depot, index) => (
            <li key={index} className="p-4 border rounded-lg bg-gray-50">
              <p className="mb-2">
                <strong>Date:</strong> {new Date(depot.date).toLocaleString()}
              </p>
              <p className="mb-2">
                <strong>Amount:</strong> {depot.montant} €
              </p>
              <p className="mb-2">
                <strong>Description:</strong> {depot.description}
              </p>
              <p className="mb-2">
                <strong>Account Name:</strong> {depot.compte_nom}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyDepots;
