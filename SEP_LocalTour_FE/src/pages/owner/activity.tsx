import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PlaceView } from 'src/sections/serviceowner/activity/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Place Activity - ${CONFIG.appName}`}</title>
      </Helmet>

      <PlaceView />
    </>
  );
}
