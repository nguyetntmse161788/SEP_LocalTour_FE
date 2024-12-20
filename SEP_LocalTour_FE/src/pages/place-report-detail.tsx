import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PlaceReportDetailView } from 'src/sections/placereport/view/place-report-detail-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Place Report Detail- ${CONFIG.appName}`}</title>
      </Helmet>

      <PlaceReportDetailView />
    </>
  );
}
