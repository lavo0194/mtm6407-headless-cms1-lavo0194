<template>
    <div>
      <h2>Reviews</h2>
      
      <!-- Search Input -->
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search reviews..."
        class="search-input"
      />
  
      <!-- Filtered List of Reviews -->
      <ul v-if="filteredReviews.length > 0">
        <li v-for="review in filteredReviews" :key="review.id" @click="viewReview(review.id)">
          <h3>{{ review.Title }}</h3>
          <p>{{ review.content[0]?.children[0]?.text }}</p>
          <p>Rating: {{ review.rating }}</p>
        </li>
      </ul>
  
      <p v-else>No reviews found.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const reviews = ref([]);
  const searchTerm = ref('');
  const router = useRouter();
  
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/reviews');
      reviews.value = response.data.data; // Store fetched reviews
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  });
  
  // Filter reviews based on search term
  const filteredReviews = computed(() => {
    return reviews.value.filter(review => {
      return review.Title.toLowerCase().includes(searchTerm.value.toLowerCase());
    });
  });
  
  // Navigate to full review page
  const viewReview = (id) => {
    router.push({ name: 'review', params: { id } });
  };
  </script>
  
  <style>
  .search-input {
    padding: 8px;
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  
  
  