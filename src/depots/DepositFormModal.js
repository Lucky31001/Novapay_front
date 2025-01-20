import React, { useState, useEffect, useContext } from 'react';
import api from '../config/api';
import { ThemeContext } from '../context/ThemeContext';

const DepositFormModal = ({ toggleModal, onFormSubmit }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('depot de test');
  const { theme } = useContext(ThemeContext);

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
  }, []);

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedAccount && amount) {
      try {
        const depositData = {
          montant: parseInt(amount, 10),
          description: description,
          iban: selectedAccount.iban,
        };
        await api.addDepot(depositData);
        onFormSubmit();
        toggleModal();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 ${theme}`}
    >
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Ajouter un dépôt</h2>
        {!selectedAccount ? (
          <ul className="space-y-4">
            {accounts.map((account) => (
              <li
                key={account.id}
                className="p-4 border rounded-lg bg-gray-50 cursor-pointer"
                onClick={() => handleAccountSelect(account)}
              >
                <p>
                  <strong>Nom du compte:</strong> {account.nom}
                </p>
                <p>
                  <strong>Solde du compte:</strong> {account.solde}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Montant:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Ajouter
            </button>
          </form>
        )}
        <button
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition"
          onClick={toggleModal}
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default DepositFormModal;
