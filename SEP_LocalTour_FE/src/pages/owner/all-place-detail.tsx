import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PlaceDetailAll } from 'src/sections/serviceowner/place/view/place-detail-all';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Place Details - ${CONFIG.appName}`}</title>
      </Helmet>

      <PlaceDetailAll />
    </>
  );
}
