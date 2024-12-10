import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BannerList } from 'src/sections/serviceowner/banner/view/banner-list';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Banner - ${CONFIG.appName}`}</title>
      </Helmet>

      <BannerList />
    </>
  );
}