import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserRolePage } from 'src/sections/admin/user/view/UserRolePage';

export default function AdminPage() {
  return (
    <>
      <Helmet>
        <title> {`Blog - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserRolePage />
    </>
  );
}