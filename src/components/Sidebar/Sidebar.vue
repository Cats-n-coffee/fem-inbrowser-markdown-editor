<template>
    <div class="sidebar-wrapper">
        <div class="sidebar-info">
            <h1 class="topbar-title">Markdown</h1>
            <h2>My Documents</h2>
        </div>
        <div class="sidebar-documents">
            <NewDocumentButton />
            <ul class="document-collection">

            </ul>
        </div>
        
        
        <ThemeToggle />
    </div>
</template>

<script>
import NewDocumentButton from './NewDocumentButton.vue';
import ThemeToggle from './ThemeToggle.vue';

export default {
    name: 'Sidebar',
    components: {
        NewDocumentButton,
        ThemeToggle,
    },
}
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
    width: 250px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--sidebar);
    padding: 0 24px;
}

.sidebar-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h1 {
        height: 72px;
        padding-top: 27px;
    }
    
    h2 {
        color: $medium-light-grey;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: 400;
        padding-bottom: 29px;
    }
}

@media screen and (min-width: 1200px) {
    .sidebar-info {

        h1 {
            display: none;
        }
        h2 {
            padding: 27px 0;
            height: 72px;
        }
    }
}
</style>