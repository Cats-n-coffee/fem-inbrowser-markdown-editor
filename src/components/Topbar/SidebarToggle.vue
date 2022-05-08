<template>
    <button
      class="sidebar-toggle"
      @click="toToggleSidebar"
      type="button"
    >
      <img
        v-if="!isSidebarToggled"
        src="../../assets/images/icon-menu.svg"
        alt="open sidebar"
      />
      <img
        v-else
        src="../../assets/images/icon-close.svg"
        alt="close sidebar"
      />
    </button>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'SidebarToggle',
    computed: {
        ...mapState(['isSidebarToggled']),
    },
    methods: {
      ...mapActions(['toToggleSidebar']),
    }
}
</script>

<style lang="scss" scoped>
.sidebar-toggle {
    width: 56px;
    height: 56px;
    background-color: #35393F;
    border: none;
    cursor: pointer;
    transition: 400ms ease-in-out;

    &:hover {
        background-color: var(--orange);
    }
}

@media screen and (min-width: 768px) {
  .sidebar-toggle {
    width: 72px;
    height: 72px;
  }
}
</style>