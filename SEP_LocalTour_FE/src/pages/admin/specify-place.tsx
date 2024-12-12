import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SpecifyPlace } from 'src/sections/admin/mod/view/specify-place';

export default function SpecifyPage() {
  return (
    <>
      <Helmet>
        <title> {`Blog - ${CONFIG.appName}`}</title>
      </Helmet>

      <SpecifyPlace />
    </>
  );
}