<template>
    <div class="editor-wrapper">
        <div class="document-header">
            <h2>Markdown</h2>
            <ToggleView class="editor-toggle-view"/>
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
import ToggleView from './ToggleView.vue';

export default {
    name: 'Editor',
    components: {
        ToggleView,
    },
    data() {
        return {
            textInput: '',
        }
    },
    computed: {
        ...mapState(['documentMdInView']),
    },
    mounted() {
        if (this.documentMdInView.content.length) {
            this.textInput = this.documentMdInView.content;
        }
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

.document-header {
    display: flex;
    justify-content: space-between;
}

.editor-toggle-view {
    display: block;

    @media screen and (min-width: 600px) {
        display: none;
    }
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

    &:focus {
        outline: solid 1px var(--orange);
    }
}
</style>