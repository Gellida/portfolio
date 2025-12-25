import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home/Home';
import Projects from '../pages/Projects/Projects';
import Challenges from '../pages/Challenges/Challenges';
import VisualThinking from '../pages/VisualThinking/VisualThinking';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';

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
    path: '/challenges',
    element: <Layout><Challenges /></Layout>,
  },
  {
    path: '/visual-thinking',
    element: <Layout><VisualThinking /></Layout>,
  },
  {
    path: '/about',
    element: <Layout><About /></Layout>,
  },
  {
    path: '/contact',
    element: <Layout><Contact /></Layout>,
  },
]);
