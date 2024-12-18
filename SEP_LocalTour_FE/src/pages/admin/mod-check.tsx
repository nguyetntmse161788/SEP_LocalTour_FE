import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ModCheckView } from 'src/sections/admin/mod-check/view/mod-check-view';

// ----------------------------------------------------------------------

export default function ModCheckPage() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <ModCheckView />
    </>
  );
}
