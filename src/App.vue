<template>
  <div id="container">
    <Topbar />
    <Sidebar />
  </div>
</template>

<script>
import Topbar from './components/Topbar/Topbar.vue';
import Sidebar from './components/Sidebar/ThemeToggle.vue';

export default {
  name: 'AppWrapper',
  components: {
    Topbar,
    Sidebar,
  }
}
</script>

<style lang="scss">
.orange-button {
  background-color: var(--orange);
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: 400ms ease-in-out;

  &:hover {
    background-color: var(--light-orange);
  }
}

.topbar-title {
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 700;
  color: var(--bars-secondary);
  letter-spacing: 5px;
}
</style>
