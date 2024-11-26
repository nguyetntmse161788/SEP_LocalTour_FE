import { Label } from 'src/components/label'; 
import { SvgColor } from 'src/components/svg-color'; 
import { useAuth } from 'src/layouts/components/account-popover'; 

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
      icon: icon('ic-place'),
    },
    isServiceOwner && {
      title: 'Place Created',
      path: '/owner/created',
      icon: icon('ic-place'),
    },
    {
      title: 'Event',
      path: '/event',
      icon: icon('ic-event'),
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

  return navItems.filter((item): item is NavItem => Boolean(item));
};