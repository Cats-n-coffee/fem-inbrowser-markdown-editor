<template>
    <div class="topbar-wrapper">
        <div class="left-menu-section">
            <SidebarToggle />
            <h1 class="topbar-title">
                Markdown
            </h1>
        </div>
        <div class="middle-files-section">
            <div
              v-if="documentMdInView.title.length"
              class="current-tab"
            >
                <svg class="item-icon" width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.107 3.393c.167.167.31.393.429.678.119.286.178.548.178.786v10.286c0 .238-.083.44-.25.607a.827.827 0 0 1-.607.25h-12a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V.857C0 .62.083.417.25.25A.827.827 0 0 1 .857 0h8c.238 0 .5.06.786.179.286.119.512.261.678.428l2.786 2.786ZM9.143 1.214v3.357H12.5c-.06-.172-.125-.294-.196-.366L9.509 1.411c-.072-.072-.194-.137-.366-.197Zm3.428 13.643V5.714H8.857a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V1.143H1.143v13.714H12.57Z" fill="#FFF"/>
                </svg>
                <div class="current-tab-text">
                    <span>Document Name</span>
                    <span>{{ documentMdInView.title + '.md' }}</span>
                </div>
            </div>
        </div>
        <div
          v-if="!isSidebarToggled"
          class="right-tools-section">
            <button
              class="delete-button"
              @click="openDeleteModal"
            >
                <svg width="18" height="20" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z"
                      fill="#7C8187"
                    />
                </svg>
            </button>
            <SaveButton @click="saveDocument"/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import SaveButton from './SaveButton.vue';
import SidebarToggle from './SidebarToggle.vue';

export default {
    name: 'Topbar',
    components: {
        SaveButton,
        SidebarToggle,
    },
    computed: {
        ...mapState(['isSidebarToggled', 'documentMdInView']),
    },
    methods: {
        ...mapActions(['saveDocument']),
        ...mapMutations(['toggleModal']),
        openDeleteModal() {
            if (this.documentMdInView.id) {
                this.toggleModal(true);
            }
        },
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

.current-tab {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 24px;

    &-text {
        display: flex;
        flex-direction: column;
        margin-left: 16px;

        span:first-child {
            color: var(--bars-primary);
            font-size: 13px;
            font-weight: 300;
        }
        span:last-child {
            color: var(--bars-secondary);
            font-size: 15px;
            font-weight: 400;
            padding-top: 2px;
        }
    }
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