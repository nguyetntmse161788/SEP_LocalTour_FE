import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BannerView } from 'src/sections/admin/banner/view/banner-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Banner View - ${CONFIG.appName}`}</title>
      </Helmet>

      <BannerView />
    </>
  );
}
