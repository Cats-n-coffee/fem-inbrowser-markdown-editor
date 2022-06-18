<template>
  <div id="container">
    <Sidebar v-if="isSidebarToggled"/>
    <div class="persistent-content">
      <Topbar />
      <DocumentView />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Topbar from './components/Topbar/Topbar.vue';
import Sidebar from './components/Sidebar/Sidebar.vue';
import DocumentView from './components/Views/DocumentView.vue';

export default {
  name: 'AppWrapper',
  components: {
    Topbar,
    Sidebar,
    DocumentView,
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

.document-header {
  background-color: var(--content-header-bg);
  height: 42px;
  padding: 12px 16px;

  h2 {
    color: var(--content-header-text);
    font-size: 14px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 500;
  }
}

.file-content {
  height: calc(100% - 42px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
