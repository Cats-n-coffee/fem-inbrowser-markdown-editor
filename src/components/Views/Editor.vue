<template>
    <div class="editor-wrapper">
        <div class="document-header">
            <h2>Markdown</h2>
        </div>
        <div class="file-content">
            <textarea
              class="typing-area"
              v-model="textInput"
              @input="updateDocumentText"
            />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'Editor',
    data() {
        return {
            textInput: '',
        }
    },
    computed: {
        ...mapState(['documentMdInView']),
    },
    methods: {
        ...mapActions(['toAppendText']),
        updateDocumentText() {
            this.$store.dispatch('toAppendText', this.textInput);
        }
    },
    watch: {
        documentMdInView: {
            handler(newValue) {
                this.textInput = newValue.content;
            },
            deep: true,
        }
    }
}
</script>

<style lang="scss" scoped>
.editor-wrapper {
    flex-grow: 1;
    flex-basis: 0;
    border-right: 1px solid var(--separation-border);
}

.typing-area {
    resize: none;
    width: 100%;
    height: calc(100% - 2px);
    border: none;
    padding: 9px 16px;
    font-family: $font-mono;
    font-size: 14px;
    background-color: var(--content-body-bg);
    color: var(--content-markdown-text);
}
</style>