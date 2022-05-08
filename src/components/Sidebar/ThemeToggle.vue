<template>
    <div class="theme-toggle-wrapper">
        <button @click="toggle" type="button">switch</button>
    </div>
</template>

<script>
export default {
    name: 'ThemeToggle',
    methods: {
        toggle() {
            this.$store.commit('switchTheme');
        }
    }
}
</script>

<style lang="scss" scoped>
.theme-toggle-wrapper {
    margin-top: auto;
    padding-bottom: 24px;
}
</style>