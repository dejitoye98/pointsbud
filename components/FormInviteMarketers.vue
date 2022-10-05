<template>
    <div class="invite">
        <div class="form-input">
            <label>Email Address <span>*</span></label>
            <input type="text" />
        </div>
        <div class="form-input">
            <label>Note</label>
            <textarea type="text"></textarea>
        </div>
        <div style="display: flex;justify-content:flex-end">
            <button class="button">Invite</button>
        </div>
    </div>
</template>


<script>
export default {
    
}
</script>


<style lang="scss" scoped>
.form-input {
    @include plain-form-input;
}
.button {
    @include smallbutton;
    min-height: auto;
    height: auto;
    width: auto;
    padding: 8px 16px;

}
</style>