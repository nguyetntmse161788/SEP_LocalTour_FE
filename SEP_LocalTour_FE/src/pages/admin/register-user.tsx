import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { RegisterPage } from 'src/sections/admin/user/view/RegisterPage';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Report User - ${CONFIG.appName}`}</title>
      </Helmet>

      <RegisterPage />
    </>
  );
}
