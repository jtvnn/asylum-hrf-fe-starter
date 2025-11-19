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
      {/* <div>{'Type this into Canvas: ' + decodeBase64('VGltZTJDb2RlIQ==')}</div> */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 px-6 max-w-6xl"> 
      <img src={barGraph} alt="Bar Graph" className="w-full h-auto" />
      <img src={lineGraph} alt="Line Graph" className="w-full h-auto" />
      <img src={pieChart} alt="Pie Chart" className="w-full h-auto" />
      <img src={paperStack} alt="Paper Stack" className="w-full h-auto" />
      </section>
    </div>
  );
};
