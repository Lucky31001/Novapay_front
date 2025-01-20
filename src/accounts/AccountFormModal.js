import React, { useState, useContext } from 'react';
import api from '../config/api';
import { ThemeContext } from '../context/ThemeContext';

const AccountFormModal = ({ toggleModal, onFormSubmit }) => {
  const [accountName, setAccountName] = useState('');
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post_compte_bancaire({ nom: accountName });
      onFormSubmit();
      toggleModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ${theme}`}
    >
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Créé un compte</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nom du compte</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={toggleModal}
            >
              Annulée
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Créé
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountFormModal;
