<template>
  <div id="container">
    <Sidebar v-if="isSidebarToggled"/>
    <div class="persistent-content">
      <Topbar />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Topbar from './components/Topbar/Topbar.vue';
import Sidebar from './components/Sidebar/Sidebar.vue';

export default {
  name: 'AppWrapper',
  components: {
    Topbar,
    Sidebar,
  },
  computed: {
    ...mapState(['isSidebarToggled']),
  }
}
</script>

<style lang="scss">
#container {
  display: flex;
}

.persistent-content {
  width: 100%;
}

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
