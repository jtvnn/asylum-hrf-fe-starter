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
  };

  // holds graph data from backend endpoints
  const [graphData, setGraphData] = useState(initialData);

  // controls data-loading lifecycle
  const [isDataLoading, setIsDataLoading] = useState(true);

  useLocalStorage({ graphData, setGraphData });

  // API Calls
  // gets fiscal-year summary
  const getFiscalData = async () => {
    // TODO: Replace this with functionality to retrieve the data from the fiscalSummary endpoint
    const { data } = await axios.get(`${API_BASE_URL}/fiscalSummary`);
    console.log('Fiscal Data: ', data);
    return data;
  };
  // gets citizenship breakdown
  const getCitizenshipResults = async () => {
    // TODO: Replace this with functionality to retrieve the data from the citizenshipSummary endpoint
    const { data } = await axios.get(`${API_BASE_URL}/citizenshipSummary`);
    return data;
  };
  // user triggered new query (flow: isDataLoading -> true, useEffect triggered, fetchData triggered)
  const updateQuery = async () => {
    setIsDataLoading(true);
  };
  // main fetcher
  const fetchData = async () => {
    // TODO: fetch all the required data and set it to the graphData state
    try {
      // fetch both endpoints
      const [fiscalData, citizenshipData] = await Promise.all([getFiscalData(), getCitizenshipResults()]);

      // merge both endpoints into one object
      const merged = {
        ...fiscalData,
        yearResults: Array.isArray(fiscalData?.yearResults) ? fiscalData.yearResults : [],
        citizenshipResults: Array.isArray(citizenshipData) ? citizenshipData : (citizenshipData?.results ?? []),
      };

      console.log('Merged Data: ', merged);
      console.log('yearResults type:', typeof merged.yearResults, Array.isArray(merged.yearResults));

      // store into state -> and localStorage
      setGraphData(merged);
    } catch (err) {
      console.error('Error fetching graph data: ', err);

      // on failure -> preserve previous data and valid arrays
      setGraphData(prev => ({
        ...prev,
        yearResults: Array.isArray(prev?.yearResults) ? prev.yearResults : [],
        citizenshipResults: Array.isArray(prev?.citizenshipResults) ? prev.citizenshipResults : [],
      }));
    } finally {
      // data load attempt is complete
      setIsDataLoading(false);
    }
  };
  //---Helpers---
  // clears results/graphs
  const clearQuery = () => {
    setGraphData({ yearResults: [], citizenshipResults: [] });
  };

  // get Years
  // ensures no crash if yearResults = UDF
  const getYears = () => 
    (Array.isArray(graphData?.yearResults) ? graphData.yearResults : []).map(
    ({ fiscal_year }) => Number(fiscal_year)
    );

  // triggers data load on mount/refresh
  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  // context value exposure
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
