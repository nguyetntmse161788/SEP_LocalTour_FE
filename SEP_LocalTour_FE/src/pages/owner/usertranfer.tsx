import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PlaceView } from 'src/sections/serviceowner/usertranfer/view/place-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`User Tranfer - ${CONFIG.appName}`}</title>
      </Helmet>

      <PlaceView />
    </>
  );
}