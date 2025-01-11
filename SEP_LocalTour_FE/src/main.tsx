import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { setupAutoRefresh } from 'src/utils/auth';
import { ToastContainer } from 'react-toastify';
import App from './app';

// ----------------------------------------------------------------------

setupAutoRefresh();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            limit={1}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
            />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  // </StrictMode>
);
