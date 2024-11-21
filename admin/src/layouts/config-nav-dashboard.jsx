import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {

  blog: icon('ic-blog'),
  chat: icon('ic-chat'),

  user: icon('ic-user'),

  lock: icon('ic-lock'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),

  folder: icon('ic-folder'),
  banking: icon('ic-banking'),

  invoice: icon('ic-invoice'),
  product: icon('ic-product'),

  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),


  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [



      { title: 'Banking', path: paths.dashboard.general.banking, icon: ICONS.banking },

    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'User',
        path: paths.dashboard.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Profile', path: paths.dashboard.user.root },

          { title: 'List', path: paths.dashboard.user.list },
          { title: 'Create', path: paths.dashboard.user.new },
          { title: 'Edit', path: paths.dashboard.user.demo.edit },
          { title: 'Account', path: paths.dashboard.user.account },
        ],
      },
      {
        title: 'Listing',
        path: paths.dashboard.product.root,
        icon: ICONS.product,
        children: [
          { title: 'List', path: paths.dashboard.product.root },
          { title: 'Details', path: paths.dashboard.product.demo.details },
          { title: 'Create', path: paths.dashboard.product.new },
          { title: 'Edit', path: paths.dashboard.product.demo.edit },
        ],
      },


      {
        title: 'Reservation',
        path: paths.dashboard.order.root,
        icon: ICONS.order,
        children: [
          { title: 'List', path: paths.dashboard.order.root },
          { title: 'Details', path: paths.dashboard.order.demo.details },
        ],
      },



      {
        title: 'Customer',
        path: paths.dashboard.customer.root,
        icon: ICONS.product,
        children: [
          { title: 'List', path: paths.dashboard.customer.root },
          { title: 'Details', path: paths.dashboard.customer.demo.details },
          { title: 'Create', path: paths.dashboard.customer.new },
          { title: 'Edit', path: paths.dashboard.customer.demo.edit },
        ],
      },



      {
        title: 'Review',
        path: paths.dashboard.review.root,
        icon: ICONS.product,
        children: [
          { title: 'List', path: paths.dashboard.review.root },
          { title: 'Details', path: paths.dashboard.review.demo.details },
          { title: 'Create', path: paths.dashboard.review.new },
          { title: 'Edit', path: paths.dashboard.review.demo.edit },
        ],
      },







      {
        title: 'Invoice',
        path: paths.dashboard.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'List', path: paths.dashboard.invoice.root },
          { title: 'Details', path: paths.dashboard.invoice.demo.details },
          { title: 'Create', path: paths.dashboard.invoice.new },
          { title: 'Edit', path: paths.dashboard.invoice.demo.edit },
        ],
      },
      {
        title: 'Blog',
        path: paths.dashboard.post.root,
        icon: ICONS.blog,
        children: [
          { title: 'List', path: paths.dashboard.post.root },
          { title: 'Details', path: paths.dashboard.post.demo.details },
          { title: 'Create', path: paths.dashboard.post.new },
          { title: 'Edit', path: paths.dashboard.post.demo.edit },
        ],
      },




      { title: 'Chat', path: paths.dashboard.chat, icon: ICONS.chat },

    ],
  },
  /**
   * Item State
   */

];
