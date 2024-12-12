import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ModView } from 'src/sections/admin/mod/view/mod-view';

export default function SpecifyPage() {
  return (
    <>
      <Helmet>
        <title> {`Manage Moderator - ${CONFIG.appName}`}</title>
      </Helmet>

      <ModView />
    </>
  );
}