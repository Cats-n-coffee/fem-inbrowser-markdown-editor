<template>
    <li
      class="document-item"
      @click="displayDoc"
    >
        <svg class="item-icon" width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.107 3.393c.167.167.31.393.429.678.119.286.178.548.178.786v10.286c0 .238-.083.44-.25.607a.827.827 0 0 1-.607.25h-12a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V.857C0 .62.083.417.25.25A.827.827 0 0 1 .857 0h8c.238 0 .5.06.786.179.286.119.512.261.678.428l2.786 2.786ZM9.143 1.214v3.357H12.5c-.06-.172-.125-.294-.196-.366L9.509 1.411c-.072-.072-.194-.137-.366-.197Zm3.428 13.643V5.714H8.857a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V1.143H1.143v13.714H12.57Z" fill="#FFF"/>
        </svg>
        <div class="item-content">
            <span class="document-date">{{ item.date || '' }}</span>
            <input
              class="document-title"
              :class="{ enabled: renameEnabled}"
              v-model="documentName"
              :size="titleSize"
              :readonly="!renameEnabled"
              maxlength="50"
              @dblclick="allowRename"
              @change="renameDocument"
              @blur="disallowRename"
            />
        </div>
    </li>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
    name: "DocumentItem",
    props: {
        item: { type: Object, default: () => ({})},
    },
    data() {
        return {
            documentName: (this.item?.title || "untitled-document") + ".md",
            renameEnabled: false,
        };
    },
    computed: {
        titleSize() {
            return this.documentName.length - 3 > 0
                ? this.documentName.length - 3
                : 3;
        },
    },
    methods: {
        ...mapMutations(['setDocumentInView']),
        ...mapActions(['updateDocumentInCollection']),
        renameDocument() {
            this.updateDocumentInCollection({
                item: this.item,
                update: { title: this.documentName }
            });
        },
        allowRename() {
            this.renameEnabled = true;
        },
        disallowRename() {
            this.renameEnabled = false;
            if (!this.documentName.includes(".md")) {
                this.documentName = `${this.documentName}.md`;
            }
        },
        displayDoc() {
            console.log('display', this.item);
            this.setDocumentInView(this.item);
        }
    },
}
</script>

<style lang="scss" scoped>
.document-item {
    list-style: none;
    height: 62px;
    padding-bottom: 26px;
    display: flex;
    align-items: center;
}

.item-icon {
    width: 14px;
    height: 16px;
    /* width: 100%; */
}

.item-content {
    margin-left: 16px;
    max-width: 172px;
    width: 100%;
}

.document-date {
    color: var(--bars-primary);
    font-weight: 300;
    font-size: 13px;
    line-height: 16px;
}

.document-title {
    width: auto;
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    color: var(--bars-secondary);
    max-width: 172px;
    border: none;
    outline: none;

    &:read-only {
        background-color: var(--sidebar);
        text-overflow: ellipsis;
    }
    &:hover {
        cursor: pointer;
    }
}

.enabled {
    outline: none;
    background-color: var(--sidebar-toggle);
    color: var(--orange);
    caret-color: var(--orange);
}
</style>