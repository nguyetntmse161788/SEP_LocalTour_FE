import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserBanPage } from 'src/sections/admin/user/view/UserBanPage';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Report User - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserBanPage />
    </>
  );
}
