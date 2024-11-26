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
    {
      title: 'Dashboard',
      path: '/',
      icon: icon('ic-analytics'),
    },
    {
      title: 'User',
      path: '/user',
      icon: icon('ic-user'),
    },
    {
      title: 'Place',
      path: isAdmin ? '/place' : isModerator ? '/mod/place' : isServiceOwner ? '/owner/place' : '/404',
      icon: icon('ic-cart'),
    },
    isServiceOwner && {
      title: 'Place Created',
      path: '/owner/created',
      icon: icon('ic-cart'),
    },
    {
      title: 'Event',
      path: isAdmin ? '/event' : isModerator ? '/mod/event' : isServiceOwner ? '/owner/event' : '/404',
      icon: icon('ic-cart'),
    },
    {
      title: 'Place Activity',
      path: isAdmin ? '/activity' : isModerator ? '/mod/activity' : isServiceOwner ? '/owner/activity' : '/404',
      icon: icon('ic-cart'),
      info: (
        <Label color="error" variant="inverted">
          +3
        </Label>
      ),
    },
    {
      title: 'Product',
      path: '/products',
      icon: icon('ic-cart'),
      info: (
        <Label color="error" variant="inverted">
          +3
        </Label>
      ),
    },
    {
      title: 'Blog',
      path: '/blog',
      icon: icon('ic-blog'),
    },
    {
      title: 'Not found',
      path: '/404',
      icon: icon('ic-disabled'),
    },
  ];

  return navItems.filter((item): item is NavItem => Boolean(item));
};
export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'User',
    path: '/admin',
    icon: icon('ic-user'),
  },
  {
    title: 'User Report',
    path: '/reportUser',
    icon: icon('ic-user'),
  },
  {
    title: 'Place',
    path: '/place',
    icon: icon('ic-user'),
  },
  {
    title: 'Product',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: icon('ic-blog'),
  },
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];

export const adminNavData = [
  {
    title: 'User',
    path: '/admin',
    icon: icon('ic-user'),
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: icon('ic-blog'),
  },
//   {
//     title: 'Sign in',
//     path: '/sign-in',
//     icon: icon('ic-lock'),
//   },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
