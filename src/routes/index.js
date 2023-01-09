import HomePage from '~/pages/client/HomePage/HomePage';
import DetailToy from '~/pages/client/DetailToy/DetailToy';
import CartPage from '~/pages/client/CartPage/CartPage';
import AdminDefault from '~/pages/admin/AdminDefault/AdminDefault';
import ToyManage from '~/pages/admin/ToyManage/ToyManage';

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/detail-toy', component: DetailToy },
  { path: '/cart-page', component: CartPage },
  { path: 'detail-toy/:id', component: DetailToy },
];

//only Login to use this routes
const privateRoutes = [
  { path: '/admin', component: AdminDefault },
  { path: '/admin-toy-manage', component: ToyManage },
];
export { privateRoutes, publicRoutes };
