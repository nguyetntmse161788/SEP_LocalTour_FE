import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserUpdatePage } from 'src/sections/admin/user/view/UserUpdatePage';

export default function AdminPage() {
  return (
    <>
      <Helmet>
        <title> {`Blog - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserUpdatePage />
    </>
  );
}