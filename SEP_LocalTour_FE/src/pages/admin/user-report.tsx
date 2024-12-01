import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ReportUserView } from 'src/sections/admin/report/view/report-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Report User - ${CONFIG.appName}`}</title>
      </Helmet>

      <ReportUserView />
    </>
  );
}
