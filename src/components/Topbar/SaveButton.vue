<template>
    <button class="save-button-wrapper orange-button">
        <img src="../../assets/images/icon-save.svg" alt="save icon"/>
        <p class="save-button-text">
            Save Changes
        </p>
    </button>
</template>

<script>
export default {
    name: 'SaveButton',
}
</script>

<style lang="scss" scoped>
.save-button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px; 
}

.save-button-text {
    display: none;
    color: var(--bars-secondary);
    padding-left: 7px;
    font-size: 15px;
    font-weight: 400;
}

@media screen and (min-width: 768px) {
    .save-button-wrapper {  
        width: 152px;
    }

    .save-button-text {
        display: block;
    }
}
</style>