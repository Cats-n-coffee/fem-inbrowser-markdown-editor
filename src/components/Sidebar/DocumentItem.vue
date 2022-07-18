<template>
    <li>
        <input
          class="document-title"
          v-model="documentName"
          :size="documentName.length - 6"
          :disabled="false"
        />
        <span>.md</span>
    </li>
</template>

<script>
export default {
    name: "DocumentItem",
    props: {
        item: { type: Object, default: () => ({})},
    },
    data() {
        return {
            documentName: 'untitled-document',
        };
    },
}
</script>

<style lang="scss" scoped>
.document-title {
    width: auto;
}
</style>