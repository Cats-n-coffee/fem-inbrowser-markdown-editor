<template>
    <button
    class="orange-button new-document-btn"
    @click="createDocument"
    >
        + New Document
    </button>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
export default {
    name: 'NewDocumentButton',
    methods: {
        ...mapActions(['saveDocument']),
        ...mapMutations(['setDocumentInView']),
        createDocument() {
            this.saveDocument();
            this.setDocumentInView({
                title: "",
                date: "",
                content: "",
                id: "",
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.new-document-btn {
    width: 202px;
    height: 40px;
    color: $white;
    margin-bottom: 24px;
}
</style>