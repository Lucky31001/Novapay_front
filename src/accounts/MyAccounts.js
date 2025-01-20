import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import api from '../config/api';
import AccountFormModal from './AccountFormModal';

const MyAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountsData = await api.comptes_bancaires();
        setAccounts(accountsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAccounts();
  }, [fetchTrigger]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFormSubmit = () => {
    setFetchTrigger(!fetchTrigger);
  };

  const handleCloture = async (id) => {
    try {
      await api.cloture(id);
      setFetchTrigger(!fetchTrigger); // Refresh the accounts list
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center">My Accounts</h1>
          <ul className="space-y-4">
            {accounts.map((account, index) => (
                <li key={index} className="p-4 border rounded-lg bg-gray-50">
                  <p className="mb-2">
                    <strong>Nom du compte:</strong> {account.nom}
                  </p>
                  <p className="mb-2">
                    <strong>Solde du compte:</strong> {account.solde}
                  </p>
                  <p className="mb-2">
                    <strong>IBAN:</strong> {account.iban}
                  </p>
                  {account.est_compte_courant }
                  <button
                      className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                      onClick={() => handleCloture(account.id)}
                  >
                    Clôturer
                  </button>
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
            <AccountFormModal
                toggleModal={toggleModal}
                onFormSubmit={handleFormSubmit}
            />
        )}
      </div>
  );
};

export default MyAccounts;