import { createRouter, createWebHistory } from 'vue-router';
import ReviewList from '../components/ReviewList.vue';
import FullReview from '../components/FullReview.vue';

const routes = [
  {
    path: '/',
    name: 'review-list',
    component: ReviewList,
  },
  {
    path: '/review/:id',
    name: 'review',
    component: FullReview,
    props: true, // Pass the route params to the component as props
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
