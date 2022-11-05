<template>
    <div class="invite">
        <div class="form-input">
            <label>Email Address <span>*</span></label>
            <input type="text" v-model="email" />
        </div>
        <div style="display: flex;justify-content:flex-end">
            <button class="button" :disabled="loading || isInvalidEmail" @click="invite">Invite</button>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            email: '',
            loading: false,
            error: ''
        }
    },
    methods: {
        invite() {
            this.loading = true;
            this.error = ""
            if (!this.email) {
                this.error =  "Please enter email";
                
            }
            this.$api.post('/users/invite', {
                email: this.email,
            }).then(resp=> {
                this.loading = false;
                this.$store.dispatch('dashboard/actionShowSuccessToast', {message: "Successfully sent an invite to " + this.email });
            }).catch(err=> {
                console.log(err)
                this.error = err && err.response && err.response.data.data || err
                this.$store.dispatch('dashboard/actionShowErrorToast', {message: this.error })
                this.loading = false;
            })
        }
        
    },
    computed: {
        isInvalidEmail() {
            if (!this.email) return true;
            if (!this.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                return true;
            }
            return false;
        }
    }
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