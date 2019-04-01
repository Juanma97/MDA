import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import AddProduct from './views/AddProduct.vue';
import ProductsView from './views/ProductsView.vue';
import DetailsProducts from './views/DetailsProducts.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
    },
    {
      name: 'AddProduct',
      path: '/addproduct',
      component: AddProduct,
    },
    {
      name: 'ProductsView',
      path: '/productsview',
      component: ProductsView,
    },
    {
      name: 'DetailsProducts',
      path: '/detailsproducts',
      component: DetailsProducts,
    },
  ],
});
