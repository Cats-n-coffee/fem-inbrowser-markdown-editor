<template>
    <div class="delete-modal-container">
        <div class="delete-modal">
            <span @click="closeModal">
                <svg class="close-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#FFF" fill-rule="evenodd">
                        <path d="M2.1.686 23.315 21.9l-1.415 1.415L.686 2.1z"/>
                        <path d="M.686 21.9 21.9.685l1.415 1.415L2.1 23.314z"/>
                    </g>
                </svg>
            </span>
            
            <h2>Delete this document?</h2>
            <p>Are you sure you want to delete the
                '{{documentMdInView.title}}' document
                and its content?<br>
                This action cannot be reversed.
            </p>
            <button class="orange-button">Confirm & Delete</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    name: 'DeleteModal',
    computed: {
        ...mapState(['documentMdInView']),
    },
    methods: {
        ...mapMutations(['toggleModal']),
        ...mapActions(['deleteDocumentInCollection']),
        deleteAndClose() {
            this.deleteDocumentInCollection(this.documentMdInView.id);
            this.toggleModal(false);
        },
        closeModal() {
            this.toggleModal(false);
        }
    },
}
</script>

<style lang="scss" scoped>
.delete-modal-container {
    position: absolute;
    background-color: var(--modal-background);
}

.delete-modal {
    background-color: var(--content-blocks-bg);
}
</style>