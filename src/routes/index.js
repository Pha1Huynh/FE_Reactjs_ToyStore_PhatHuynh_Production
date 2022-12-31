import HomePage from '~/pages/client/HomePage/HomePage';
import DetailToy from '~/pages/client/DetailToy/DetailToy';
import CartPage from '~/pages/client/CartPage/CartPage';
const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/detail-toy', component: DetailToy },
  { path: '/cart-page', component: CartPage },
];

//only Login to use this routes
const privateRoutes = [];
export { privateRoutes, publicRoutes };
