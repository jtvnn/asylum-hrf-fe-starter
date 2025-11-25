import pieChart from '../../../assets/pie-chart.png';
import lineGraph from '../../../assets/line-graph.png';
import barGraph from '../../../assets/bar-graph.png';
import paperStack from '../../../assets/paper-stack.jpg';
import { useNavigate } from 'react-router-dom';
import { useDownloadData } from '../../../hooks/useDownloadData.js';
{
  /*import { decodeBase64 } from '../../../utils/decodeBase64.js';*/
}

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
      {/* Introduction */}
      <section className='w-full bg-[#666453] text-white py-6 text-center'>
        <h1 className='text-3xl font-semibold'>Asylum Office Grant Rate Tracker</h1>
        <p className='mt-2 text-xs max-w-3xl mx-auto'>
          The Asylum Office Grant Rate Tracker provides asylum seekers, researchers, policymakers, and the public an interactive tool to explore USCIS data on
          Asylum Office decisions
        </p>
      </section>
      {/* Graphing Icons */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-10 py-12 px-6 max-w-6xl'>
        {/* Bar Graph */}
        <div className='flex flex-col items-center'>
          <img src={barGraph} alt='Bar Graph' className='h-40' />
          <p className='mt-3 font-medium'>Search Grant Rates By Office</p>
        </div>
        {/* Pie Graph */}
        <div className='flex flex-col items-center'>
          <img src={pieChart} alt='Pie Chart' className='h-40' />
          <p className='mt-3 font-medium'>Search Grant Rates By Nationality</p>
        </div>
        {/* Line Graph */}
        <div className='flex flex-col items-center'>
          <img src={lineGraph} alt='Line Graph' className='h-40' />
          <p className='mt-3 font-medium'>Search Grant Rates Over Time</p>
        </div>
      </section>
      {/* Top buttons */}
      <div className='flex gap-4 my-4'>
        {/* View data button */}
        <button onClick={() => navigate('/graphs')} className='px-6 py-2 border border-gray-600 rounded hover:bg-gray-100 transition'>
          View the Data
        </button>
        {/* Download data button */}
        <button onClick={downloadCSV} className='px-6 py-2 border border-gray-600 rounded hover:bg-gray-100 transition'>
          Download the Data
        </button>
      </div>
      {/* Paper stack image with paragraph */}
      <section className='flex flex-col md:flex-row items-center max-w-6xl gap-8 my-12 px-6'>
        <img src={paperStack} alt='Paper stack' className='w-full md:w-1/2 rounded shadow' />
        <p className='w-full md:w-1/2 leading-relaxed text-[15px]'>
          Human Rights First has created a search tool to give you a user-friendly way to explore a data set of asylum decisions between FY 2016 and May 2021 by
          the USCIS Asylum Office, which we received through a Freedon of Information Act request. You can search for information on asylum grant rates by year,
          nationality, and asylum office, visualize the data with charts and heat maps, and download the data set.
        </p>
      </section>
      {/* Systemic Disparity Section */}
      <section className='w-full py-16'>
        <h2 className='text-center text-2xl font-semibold mb-10'>Systemic Disparity Insights</h2>

        {/*<div className='text-xs opacity-40 mt-4'>{decodeBase64('VGltZTJDb2RlIQ==')}</div>*/}
        <div className='grid grid-cols-1 md:grid-cols-3 text-center max-w-5xl mx-auto gap-10 px-6'>
          <div>
            <h3 className='text-3xl font-bold'>36%</h3>
            <p className='mt-2 text-sm'>
              By the end of the Trump administration, the average asylum office grate rate fell 36% from an average of 44 percent in fiscal year 2016 to 8
              percent in fiscal year 2021.
            </p>
          </div>
          <div>
            <h3 className='text-3xl font-bold'>5%</h3>
            <p className='mt-2 text-sm'>The New York asylum office grant rate dropped to 5 percent in fiscal year 2020.</p>
          </div>
          <div>
            <h3 className='text-3xl font-bold'>6x Lower</h3>
            <p className='mt-2 text-sm'>
              Between fiscal year 2017 and 2020, the New York asylum office's average grant rate was six times lower than the San Francisco asylum office.
            </p>
          </div>
        </div>
        {/* Bottom buttons */}
        <div className='flex justify-center mt-8'>
          {/* Read more button */}
          <button onClick={handleReadMore} className='px-6 py-2 border border-gray-600 rounded hover:bg-gray-100 transition'>
            Read More
          </button>
        </div>
        <div className='text-center mt-6'>
          {/* Scroll button */}
          <button onClick={scrollToTop} className='text-sm underline'>
            Back To Top ↑
          </button>
        </div>
      </section>
    </div>
  );
};
