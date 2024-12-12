import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ModView } from 'src/sections/admin/mod/view/mod-view';

// ----------------------------------------------------------------------

export default function ModPage() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <ModView />
    </>
  );
}
