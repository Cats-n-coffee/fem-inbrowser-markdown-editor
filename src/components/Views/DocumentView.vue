<template>
    <div class="document-wrapper">
        <Editor
          v-if="!isOnlyPreview"
        />
        <Preview
          :class="{ remove: !isOnlyPreview }"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Editor from './Editor.vue';
import Preview from './Preview.vue';

export default {
    name: 'DocumentView',
    components: {
        Editor,
        Preview,
    },
    computed: {
        ...mapState(['isOnlyPreview']),
    }
}
</script>

<style lang="scss" scoped>
.document-wrapper {
    display: flex;
    height: calc(100% - 72px);
}

.remove {
    display: none;

    @media screen and (min-width: 600px) {
        display: block;
    }
}
</style>