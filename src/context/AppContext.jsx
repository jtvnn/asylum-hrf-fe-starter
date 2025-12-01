import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import testData from '../data/test_data.json';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

// allows data to be shared across components
const AppContext = createContext({});

const API_BASE_URL = 'https://asylum-be.onrender.com';

/**
 * TODO: Ticket 2:
 * - Use axios to fetch the data
 * - Store the data
 * - Populate the graphs with the stored data
 */

// custom hook to provide context values
const useAppContextProvider = () => {
  const initialData = {
    yearResults: [],
    citizenshipResults: [],
  }

  // holds graph data from backend endpoints
  const [graphData, setGraphData] = useState(initialData);

  // controls data-loading lifecycle
  const [isDataLoading, setIsDataLoading] = useState(true);

  useLocalStorage({ graphData, setGraphData });

  // API Call
  // gets fiscal-year summary
  const getFiscalData = async () => {
    // TODO: Replace this with functionality to retrieve the data from the fiscalSummary endpoint
    const { data } = await axios.get(`${API_BASE_URL}/fiscalSummary`);
    console.log('Fiscal Data: ', data);
    return data;
  };
  // get citizenship breakdown
  const getCitizenshipResults = async () => {
    // TODO: Replace this with functionality to retrieve the data from the citizenshipSummary endpoint
    const { data } = await axios.get(`${API_BASE_URL}/citizenshipSummary`);
    return data;
  };

  const updateQuery = async () => {
    setIsDataLoading(true);
  };

  const fetchData = async () => {
    // TODO: fetch all the required data and set it to the graphData state
  };

  const clearQuery = () => {
    setGraphData({});
  };

  const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}