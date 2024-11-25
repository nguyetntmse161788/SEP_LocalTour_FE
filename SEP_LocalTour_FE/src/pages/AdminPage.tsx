import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/user/view';

export default function AdminPage() {
  return (
    <>
      <Helmet>
        <title> {`Blog - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserView />
    </>
  );
}