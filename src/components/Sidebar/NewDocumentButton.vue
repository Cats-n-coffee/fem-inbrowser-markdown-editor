<template>
    <button
    class="orange-button new-document-btn"
    @click="createDocument"
    >
        + New Document
    </button>
</template>

<script>
export default {
    name: 'NewDocumentButton',
    methods: {
        createDocument() {
            console.log('create document');
        }
    }
}
</script>

<style lang="scss" scoped>
.new-document-btn {
    width: 202px;
    height: 40px;
    color: $white;
}
</style>