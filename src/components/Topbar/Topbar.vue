<template>
    <div class="topbar-wrapper">
        <div class="left-menu-section">
            <SidebarToggle />
            <h1 class="topbar-title">
                Markdown
            </h1>
        </div>
        <div class="middle-files-section">
            <ul></ul>
        </div>
        <div
          v-if="!isSidebarToggled"
          class="right-tools-section">
            <button
              class="delete-button"
              @click="deleteFile"
            >
                <svg width="18" height="20" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z"
                      fill="#7C8187"
                    />
                </svg>
            </button>
            <SaveButton />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import SaveButton from './SaveButton.vue';
import SidebarToggle from './SidebarToggle.vue';

export default {
    name: 'Topbar',
    components: {
        SaveButton,
        SidebarToggle,
    },
    computed: {
        ...mapState(['isSidebarToggled']),
    },
}
</script>

<style lang="scss" scoped>
.topbar-wrapper {
    height: 56px;
    width: 100%;
    background-color: var(--topbar);
    display: flex;
}

.topbar-title {
    display: none;
}

.right-tools-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    padding: 8px;
}

.delete-button {
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 24px;

    svg > path {
        transition: 400ms ease-in-out;
    }   

    &:hover svg > path {
        fill: var(--orange);
    }
}

@media screen and (min-width: 768px) {
    .topbar-wrapper {
        height: 72px;
    }

    .right-tools-section {
        padding: 16px;
    }
}

@media screen and (min-width: 1200px) {
    .left-menu-section {
        display: flex;
        align-items: center;
    }

    .topbar-title {
        display: block;
        padding: 0 24px;
    }
}
</style>