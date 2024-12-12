import { Label } from 'src/components/label'; 
import { SvgColor } from 'src/components/svg-color'; 

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);
type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = (role: string | null): NavItem[] => {
  const isAdmin = Array.isArray(role) && role.includes('Administrator');
  const isModerator = Array.isArray(role) && role.includes('Moderator');
  const isServiceOwner = Array.isArray(role) && role.includes('Service Owner');

  const navItems: (NavItem | false)[] = [
    isAdmin && {
      title: 'Dashboard',
      path: '/',
      icon: icon('ic-analytics'),
    },
    isAdmin && {
      title: 'User',
      path: '/admin/user',
      icon: icon('ic-user'),
    },
    isAdmin && {
      title: 'User Report',
      path: '/admin/reportUser',
      icon: icon('ic-user'),
    },
    isAdmin && {
      title: 'Banner Report',
      path: '/admin/bannerUser',
      icon: icon('ic-user'),
    },
    isServiceOwner&& {
      title: 'Place',
      path: '/owner/place',
      icon: icon('ic-cart'),
    },
    isModerator && {
      title: 'Place',
      path:'/place',
      icon: icon('ic-cart'),
    },
    isServiceOwner && {
      title: 'Place Created',
      path: '/owner/created',
      icon: icon('ic-cart'),
    },
    isServiceOwner && {
      title: 'Event',
      path:'/owner/event',
      icon: icon('ic-cart'),
    },
    isModerator && {
      title: 'Event',
      path: '/event',
      icon: icon('ic-cart'),
    },
    isServiceOwner && {
      title: 'Place Activity',
      path: '/owner/activity',
      icon: icon('ic-cart'),
    },
    isServiceOwner && {
      title: 'Banner',
      path:'/owner/banner',
      icon: icon('ic-cart'),
    },
    isServiceOwner && {
      title: 'User Tranfer',
      path:'/owner/usertranfer',
      icon: icon('ic-cart'),
    },
    // {
    //   title: 'Product',
    //   path: '/products',
    //   icon: icon('ic-cart'),
    //   info: (
    //     <Label color="error" variant="inverted">
    //       +3
    //     </Label>
    //   ),
    // },
    // {
    //   title: 'Blog',
    //   path: '/blog',
    //   icon: icon('ic-blog'),
    // },
    // {
    //   title: 'Not found',
    //   path: '/404',
    //   icon: icon('ic-disabled'),
    // },
  ];

  return navItems.filter((item): item is NavItem => Boolean(item));
};