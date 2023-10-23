import React from 'react';

export const guestRoutes = [
  {
    path: '/signin',
    name: 'Signin',
    exact: true,
    component: React.lazy(() => import('../../views/auth/Login/Login')),
  },
  {
    path: '/signup',
    name: 'Signup',
    exact: true,
    component: React.lazy(() => import('../../views/auth/Signup/Signup')),
  },
  {
    path: '/terms-and-conditions',
    name: 'CMS',
    exact: true,
    component: React.lazy(() => import('../../views/user/CMS/Cms')),
  },
];

export const userRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    exact: true,
    component: React.lazy(() => import('../../views/user/Dashboard/Dashboard')),
  },
  {
    path: '/search-result',
    name: 'Dashboard',
    exact: true,
    component: React.lazy(() => import('../../views/user/SearchResult/SearchResult')),
  },
  {
    path: '/collection-detail/:id',
    name: 'Collection Detail',
    exact: true,
    component: React.lazy(() => import('../../views/user/CollectionDetail/CollectionDetail')),
  },
  {
    path: '/order-detail/:id',
    name: 'Order Detail',
    exact: true,
    component: React.lazy(() => import('../../views/user/OrderDetail/OrderDetail')),
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    exact: true,
    component: React.lazy(() => import('../../views/user/Wishlist/Wishlist')),
  },
  {
    path: '/my-collection',
    name: 'My Collections',
    exact: true,
    component: React.lazy(() => import('../../views/user/MyCollection/MyCollection')),
  },
  {
    path: '/notification',
    name: 'Notification',
    exact: true,
    component: React.lazy(() => import('../../views/user/Notification/Notification')),
  },
  {
    path: '/wallet',
    name: 'Wallet',
    exact: true,
    component: React.lazy(() => import('../../views/user/Wallet/Wallet')),
  },
  // {
  //   path: '/cms/:pageType',
  //   name: 'About',
  //   exact: true,
  //   component: React.lazy(() => import('../../views/user/CMS/Cms')),
  // },
  // {
  //   path: '/cms/:pageType',
  //   name: 'CMS',
  //   exact: true,
  //   component: React.lazy(() => import('../../views/user/CMS/Cms')),
  // },
  {
    path: '/cms/:pageType',
    name: 'CMS',
    exact: true,
    component: React.lazy(() => import('../../views/user/CMS/Cms')),
  },
  {
    path: '/address',
    name: 'Address',
    exact: true,
    component: React.lazy(() => import('../../views/user/Address/Address')),
  },
  {
    path: '/auction/:type',
    name: 'Auction',
    exact: true,
    component: React.lazy(() => import('../../views/user/Auction/Auction')),
  },
  {
    path: '/contactus',
    name: 'Contact Us',
    exact: true,
    component: React.lazy(() => import('../../views/user/ContactUs/ContactUs')),
  },
  {
    path: '/kyc-detail',
    name: 'KYC Details',
    exact: true,
    component: React.lazy(() => import('../../views/user/KYCdetails/KYCdetails')),
  },
  {
    path: '/profile',
    name: 'Profile',
    exact: true,
    component: React.lazy(() => import('../../views/user/Profile/Profile')),
  },
  {
    path: '/bid-detail/:id',
    name: 'Bid Details',
    exact: true,
    component: React.lazy(() => import('../../views/user/BidDetails/BidDetails')),
  },
  {
    path: '/orders/:type',
    name: 'Orders',
    exact: true,
    component: React.lazy(() => import('../../views/user/Orders/Orders')),
  },
  {
    path: '/coin-scan',
    name: 'Coin Scan',
    exact: true,
    component: React.lazy(() => import('../../views/user/CollectionScan/CoinScan')),
  },
  {
    path: '/note-scan',
    name: 'Note Scan',
    exact: true,
    component: React.lazy(() => import('../../views/user/CollectionScan/NoteScan')),
  },
  {
    path: '/scan-result/:id',
    name: 'Scan Resut',
    exact: true,
    component: React.lazy(() => import('../../views/user/ScanResult/ScanResult')),
  },
  {
    path: '/apply-grading/coin/:id',
    name: 'Apply Grading',
    exact: true,
    component: React.lazy(() => import('../../views/user/ApplyGrading/ApplyGrading')),
  },
  {
    path: '/apply-grading/bank-note/:id',
    name: 'Apply Grading',
    exact: true,
    component: React.lazy(() => import('../../views/user/ApplyGrading/ApplyGrading')),
  },
  {
    path: '/grading-details/:id',
    name: 'Grading Details',
    exact: true,
    component: React.lazy(() => import('../../views/user/GradingDetails/GradingDetails')),
  },
  {
    path: '/delivery-details/:id',
    name: 'Delivery detail',
    exact: true,
    component: React.lazy(() => import('../../views/user/DeliveryAddress/DeliveryAddress')),
  },
  {
    path: '/document-varification',
    name: 'Document Varification',
    exact: true,
    component: React.lazy(() =>
      import('../../views/user/DocumentVarification/DocumentVarification'),
    ),
  },
  {
    path: '/graded-collection',
    name: 'Graded Collection',
    exact: true,
    component: React.lazy(() => import('../../views/user/GradedCollection/GradedCollection')),
  },
  // {
  //   path: '/message',
  //   name: 'Message',
  //   exact: true,
  //   component: React.lazy(() => import('../../views/user/Message/Message')),
  // },
  {
    redirectRoute: true,
    name: 'dashboardRedirect',
    path: '/dashboard',
    // rootRedirect: true,
  },

  // {
  //   redirectRoute: true,
  //   payment: 'paymentRedirect',
  //   path: '/pay',
  // },
];
