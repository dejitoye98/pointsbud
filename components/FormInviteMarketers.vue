<template>
    <div class="invite">
        <div class="form-input">
            <label>Email Address <span>*</span></label>
            <input type="text" v-model="iv.marketer_email" />
        </div>
        <div class="form-input">
            <label>Note</label>
            <textarea type="text" v-model="iv.note"></textarea>
        </div>
        <div style="display: flex;justify-content:flex-end">
            <button class="button" @click="inviteMarketer">Invite</button>
        </div>
    </div>
</template>


<script>
export default {
    props: ['campaign_id'],
    data() {
        return {
            iv: {
                marketer_email: '',
                note: '',
            }
        }
    },

    methods: {
        validateForm() {
            if (!this.iv.marketer_email) {
                this.$store.dispatch('dashboard/actionShowErrorToast', {message: 
                    "Please enter email"}); // show error
                return 
            }
            if (!String(this.iv.marketer_email)
                .toLowerCase()
                .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    this.$store.dispatch('dashboard/actionShowErrorToast', {message: "Please enter valid email"}); // show error
                }
        },
        inviteMarketer() {
            this.validateForm();
            const payload = {
                campaign_id: this.campaign_id,
                marketer_email: this.iv.marketer_email,
                note: this.iv.note,
            }

            this.$api.post(`/campaigns/${this.campaign_id}/invite`, payload)
                .then(resp=> {
                    this.$store.commit('dashboard/setActionInviteMarketers', false) // clsoe modal
                    this.$store.dispatch('dashboard/actionShowSuccessToast', {message: "An email has been sent to the marketer"});
                })
                .catch(err=> {
                    const error = err.response && err.response.data.data || err
                    this.$store.dispatch('dashboard/actionShowErrorToast', {message: error}); // show error

                })
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