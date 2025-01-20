import React, { useEffect, useState } from 'react';
import api from '../config/api';
import { FaPlus } from 'react-icons/fa';
import DepositFormModal from './DepositFormModal';

const MyDepots = () => {
    const [depots, setDepots] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(false);

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
    }, [fetchTrigger]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleFormSubmit = () => {
        setFetchTrigger(!fetchTrigger);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Mes dépots</h1>
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
            <button
                className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
                onClick={toggleModal}
            >
                <FaPlus size={24} />
            </button>
            {isModalOpen && (
                <DepositFormModal
                    toggleModal={toggleModal}
                    onFormSubmit={handleFormSubmit}
                />
            )}
        </div>
    );
};

export default MyDepots;