import HomePage from '~/pages/client/HomePage/HomePage';
import DetailToy from '~/pages/client/DetailToy/DetailToy';
import CartPage from '~/pages/client/CartPage/CartPage';
import AdminDefault from '~/pages/admin/AdminDefault/AdminDefault';
import ToyManage from '~/pages/admin/ToyManage/ToyManage';
import LoginAndRegister from '~/pages/client/LoginAndRegister/LoginAndRegister';
import Catalog from '~/pages/client/Catalog/Catalog';
const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/detail-toy', component: DetailToy },
  { path: '/cart-page', component: CartPage },
  { path: 'detail-toy/:id', component: DetailToy },
  { path: '/login-and-register', component: LoginAndRegister },
  { path: '/cart-page/:userId', component: CartPage },
  { path: '/catalog', component: Catalog },
];

//only Admin to use this routes
const privateRoutes = [
  { path: '/admin', component: AdminDefault },
  { path: '/admin-toy-manage', component: ToyManage },
];
export { privateRoutes, publicRoutes };
