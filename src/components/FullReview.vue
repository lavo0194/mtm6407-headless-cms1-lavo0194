<template>
    <div v-if="review">
      <h2>{{ review.Title }}</h2>
      <p v-for="(contentItem, index) in review.content" :key="index">
        {{ contentItem.children[0]?.text }}
      </p>
      <p>Rating: {{ review.rating }}</p>
      <p>Full Review Details:</p>
      <p>{{ review.fullReviewText }}</p> <!-- Assume full review text is available -->
    </div>
    <p v-else>Review not found.</p>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const review = ref(null);
  
  onMounted(async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/reviews/${route.params.id}`);
      review.value = response.data.data; // Set review data based on ID
    } catch (error) {
      console.error('Error fetching review:', error);
    }
  });
  </script>
  