import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PlaceReportView } from 'src/sections/placereport/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Place Report - ${CONFIG.appName}`}</title>
      </Helmet>

      <PlaceReportView />
    </>
  );
}
