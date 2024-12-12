import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TagView } from 'src/sections/admin/tag/view/tag-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Tags - ${CONFIG.appName}`}</title>
      </Helmet>

      <TagView />
    </>
  );
}
