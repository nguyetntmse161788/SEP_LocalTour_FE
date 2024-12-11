import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BannerDetailPage } from 'src/sections/admin/banner/view/banner-view-detail';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Banner View Detail - ${CONFIG.appName}`}</title>
      </Helmet>

      <BannerDetailPage />
    </>
  );
}
