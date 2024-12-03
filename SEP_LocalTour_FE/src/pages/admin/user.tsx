import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/admin/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserView />
    </>
  );
}
