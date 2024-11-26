import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PlaceDetailView } from 'src/sections/serviceowner/activity/view/place-detail-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Place Details - ${CONFIG.appName}`}</title>
      </Helmet>

      <PlaceDetailView />
    </>
  );
}
