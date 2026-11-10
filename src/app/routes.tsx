import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home/Home';
import Projects from '../pages/Projects/Projects';
import PortfolioDetails from '../pages/Projects/PortfolioDetails.tsx';
import OcularIA from '../pages/Projects/OcularIA';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import CountriesAnalysis from '../pages/DataStories/CountriesAnalysis';
import NotFound from '../pages/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/projects',
    element: <Layout><Projects /></Layout>,
  },
  {
    path: '/projects/portafolio-web',
    element: <Layout><PortfolioDetails /></Layout>,
  },
  {
    path: '/projects/ocularia',
    element: <Layout><OcularIA /></Layout>,
  },
  {
    path: '/about',
    element: <Layout><About /></Layout>,
  },
  {
    path: '/contact',
    element: <Layout><Contact /></Layout>,
  },
  {
    path: '/data-stories/countries-analysis',
    element: <Layout><CountriesAnalysis /></Layout>,
  },
  {
    path: '*',
    element: <Layout><NotFound /></Layout>,
  },
]);
