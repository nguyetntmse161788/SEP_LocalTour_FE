import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ModCheckDetailView } from 'src/sections/admin/mod-check/view/mod-check-view-detail';

// ----------------------------------------------------------------------

export default function ModCheckDetailPage() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <ModCheckDetailView />
    </>
  );
}
