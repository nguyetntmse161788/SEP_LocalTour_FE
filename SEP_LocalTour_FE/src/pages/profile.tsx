import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserProfile } from 'src/components/user/user-profile'
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`User Profile - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserProfile />
    </>
  );
}
