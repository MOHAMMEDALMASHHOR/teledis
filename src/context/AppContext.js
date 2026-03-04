import React, { createContext, useContext, useState } from 'react';
import { MOCK_PATIENTS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [patients, setPatients] = useState(MOCK_PATIENTS);
    const [currentUser, setCurrentUser] = useState(null);

    const login = (role, username) => {
        setCurrentUser({ role, username, name: 'Telekonsültan Hekim 1' });
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const addPatient = (patient) => {
        const newPatient = {
            ...patient,
            id: patients.length + 1,
            hastaNo: String(patients.length + 78),
            photos: [],
            anamnez: '',
            dishEtiMuayenesi: 'Kanama Yok',
            periodontalMuayene: 'Yok',
            dentalMuayene: [],
        };
        setPatients((prev) => [...prev, newPatient]);
        return newPatient;
    };

    const updatePatient = (id, updates) => {
        setPatients((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
        );
    };

    const getPatient = (id) => patients.find((p) => p.id === id);

    return (
        <AppContext.Provider
            value={{ patients, currentUser, login, logout, addPatient, updatePatient, getPatient }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
