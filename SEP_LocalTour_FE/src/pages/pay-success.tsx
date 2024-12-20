import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SuccessView } from 'src/sections/pay/pay-success';

// ----------------------------------------------------------------------

export default function SuccessPage() {
  return (
    <>
      <Helmet>
        <title> {`404 page not found! | Error - ${CONFIG.appName}`}</title>
      </Helmet>

      <SuccessView />
    </>
  );
}
