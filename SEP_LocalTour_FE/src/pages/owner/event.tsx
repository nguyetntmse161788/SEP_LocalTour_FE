import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PlaceView } from 'src/sections/serviceowner/event/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Event - ${CONFIG.appName}`}</title>
      </Helmet>

      <PlaceView />
    </>
  );
}
