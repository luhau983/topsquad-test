import ReactDOM from 'react-dom/client';

import App from './pages/app.tsx';

import '@assets/scss/index.scss';
import '@assets/fonts/Inter/fonts.css';
import './translations/i18n.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
