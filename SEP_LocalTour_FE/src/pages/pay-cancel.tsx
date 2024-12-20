import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CancelView } from 'src/sections/pay/pay-cancel';

// ----------------------------------------------------------------------

export default function CancelPage() {
  return (
    <>
      <Helmet>
        <title> {`404 page not found! | Error - ${CONFIG.appName}`}</title>
      </Helmet>

      <CancelView />
    </>
  );
}
