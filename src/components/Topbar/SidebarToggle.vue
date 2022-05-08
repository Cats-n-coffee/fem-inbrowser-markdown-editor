<template>
    <button
      class="sidebar-toggle"
      @click="openSidebar"
      type="button"
    >
      <img
        v-if="!isSidebarOpen"
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
export default {
    name: 'SidebarToggle',
    computed: {
        isSidebarOpen() {
            return this.$store.state.isSidebarToggled;
        },
    },
}
</script>

<style lang="scss" scoped>
.sidebar-toggle {
    width: 72px;
    height: 72px;
    background-color: #35393F;
    border: none;
    cursor: pointer;
    transition: 400ms ease-in-out;

    &:hover {
        background-color: var(--orange);
    }
}
</style>