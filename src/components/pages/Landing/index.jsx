 import pieChart from '../../../assets/pie-chart.png';
 import lineGraph from '../../../assets/line-graph.png';
 import barGraph from '../../../assets/bar-graph.png';
 import paperStack from '../../../assets/paper-stack.jpg';
import { useNavigate } from 'react-router-dom';
import { useDownloadData } from '../../../hooks/useDownloadData.js';
import {decodeBase64} from '../../../utils/decodeBase64.js';

/**
 * TODO: Ticket 1:
 * Implement structure and styles of the Landing page using Tailwind
 * Implement any button functionality implied by the landing page screenshot example (tickets/examples)
 */
export const LandingPage = () => {
  const navigate = useNavigate();
  const { downloadCSV } = useDownloadData();

  const scrollToTop = () => {
    let scrollStep = -window.scrollY / 20; // Adjust the divisor for speed
    let scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 10); // Adjust the interval time for smoothness
  };

  const handleReadMore = () => {
    // TODO: navigate to the humanrightsfirst.org homepage
    window.location.href = 'https://www.humanrightsfirst.org/';
  };

  return (
    <div className='w-full min-h-screen bg-[#f4f4f4] flex flex-col items-center'>
      {/*Landing Page 
      <div>{'Type this into Canvas: ' + decodeBase64('VGltZTJDb2RlIQ==')}</div> */}
      <header className="w-full bg-[#2b1313a6] text-white py-6 text-center">
        <h1 className="text-3xl font-semibold">Asylum Office Grant Rate Tracker</h1>
        <p className="mt-2 text-xs max-w-3xl mx-auto">
          The Asylum Office Grant Rate Tracker provides asylum seekers, researchers, policymakers,
          and the public an interactive tool to explore USCIS data on Sylum Office decisions
        </p>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 px-6 max-w-6xl"> 
        <div className="flex flex-col items-center">
          <img src={barGraph} alt="Bar Graph" className="h-40" />
          <p className="mt-3 font-medium">Search Grant Rates By Office</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={pieChart} alt="Pie Chart" className="h-40" />
          <p className="mt-3 font-medium">Search Grant Rates By Nationality</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={lineGraph} alt="Line Graph" className="h-40" />
          <p className="mt-3 font-medium">Search Grant Rates Over Time</p>
        </div>
      </section>
      <div className="flex gap-4 my-4">
        <button
          onClick={() => navigate("/data")}
          className="px-6 py-2 border border-gray-600 rounded hover: bg-gray-100 transition"
          >
            View the Data
        </button>
        <button
          onClick={downloadCSV}
          className="px-6 py-2 border border-gray-600 rounded hover: bg-gray-100 transition"
          >
            Download the Data
        </button>
      </div>

    </div>
  );
};
