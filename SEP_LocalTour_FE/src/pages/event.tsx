import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { EventView } from 'src/sections/event/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Places - ${CONFIG.appName}`}</title>
      </Helmet>

      <EventView />
    </>
  );
}
