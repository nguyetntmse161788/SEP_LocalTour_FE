import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PlaceView } from 'src/sections/serviceowner/place/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Places - ${CONFIG.appName}`}</title>
      </Helmet>

      <PlaceView />
    </>
  );
}
