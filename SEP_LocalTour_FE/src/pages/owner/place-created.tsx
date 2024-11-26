import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PlaceCreatedView } from 'src/sections/serviceowner/place/view/place-created-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Places Created - ${CONFIG.appName}`}</title>
      </Helmet>

      <PlaceCreatedView />
    </>
  );
}
