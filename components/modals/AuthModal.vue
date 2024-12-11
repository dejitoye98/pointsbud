<template>
    <BaseModal @close="$emit('close')">
        <template #header>
            <div class="padding-16">

                <p>Sign in</p>
            </div>
        </template>
        <template #body>
            <template v-if="mode === 'login'">

                <div class="padding-16">
                    <div class="form-input">
                        <label for="">Your Phone</label>
                        <vue-tel-input v-model="payload.phone"></vue-tel-input>
                    </div>
                    <div class="form-input">
                        <label for="">6-digit pin</label>
                        <input type="text"  @keydown="filterInput"  v-model="payload.pin" inputmode="numeric">
                    </div>

                    <div class="full-width flex-center-x flex-col flex-center-y">
                        <button class="big-btn" :disabled="loading || !payload.phone || !payload.pin" @click="login">Sign In</button>
                        
                        <p style="margin: 10px 0;">Don't have an account? <span class="primary-text" @click="mode = 'register'">Register</span></p>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="padding-16">
                    <div class="form-input">
                        <label for="">Your Name</label>
                        <input v-model="payload.name">
                    </div>
                    <div class="form-input">
                        <label for="">Your WhatsApp Phone</label>
                        <vue-tel-input v-model="payload.phone"></vue-tel-input>
                    </div>
                    <div class="form-input">
                        <label for="">Email</label>
                        <input v-model="payload.email">
                    </div>
                    <div class="form-input">
                        <label for="">Pin</label>
                        <input  @keydown="filterInput"  v-model="payload.pin">
                    </div>
                    
                    <div class="form-input">
                        <label for="">Gender</label>
                        <select v-model="payload.gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <button class="big-btn"  @click="register" :disabled="loading">Register</button>
                </div>
            </template>
        </template>
    </BaseModal>
</template>

<script>
export default {
    data() {
        return {
            payload: {

            },
            mode: 'login',
            sucess: false,
            loading: false,
        }
    },
    methods:{ 
        filterInput(event) {
            //alert(event.target.value.length)
            if (event.target.value.length == 6) {
                if (event.keyCode === 8 || event.keyCode === 46) {
                    console.log('Backspace or Delete was pressed');
                    return
                    // Handle backspace/delete key here
                }
                else {
                    event.preventDefault();
                    return;

                }
            }
            const value = event.target.value;
            event.target.value = value.replace(/[^0-9]/g, '');
        
        },
        login() {
            this.loading = true
            this.$api.post('/customers/login', this.payload).then(resp=> {
                this.success = true;
                this.$cookies.set('usertoken', resp.data.data.token)
                this.$emit('onSuccess', resp.data.data)
                window.location.reload()
            }).catch(e=> {
                alert(e?.response?.data?.data)
            })
            .finally(()=> {
                this.loading = false
            })
        },
        register() {
            this.loading = true
            this.$api.post('/customers/register', this.payload).then(resp=> {
                this.success = true;
                this.$cookies.set('usertoken', resp.data.data.token)
                this.$emit('onSuccess', resp.data.data);
                window.location.reload()

            }).catch(e=> {
                alert(e?.response?.data?.data)
            })
            
            .finally(()=> {
                this.loading = false
            })
        },
    }
}
</script>

<style lang="scss" scoped>
* {

    &:deep(.vue-tel-input:focus-within) {
        border: 0; box-shadow: none;
    }

    &:deep(.vue-tel-input) {
        border: none !important;
        background-color: $input_background;
        border-radius: 10px;

        &:focus {
            outline: none;
        }
        &:active {
            outline: none;
        }
    }
    &:deep(.cov-date-body) {
        background-color: $primary !important;

    }

    &:deep(.active) {
        background-color: $primary !important;
    }

    &:deep(.time-picker) {
        width: 100% !important;
        input {
            height: 50px !important;
        }
    }
    &:deep(.vue-tel-input:focus-within) {
        border: 0; box-shadow: none;
    }

    &:deep(.vue-tel-input) {
        border: none !important;
        background-color: $input_background;
        border-radius: 10px;

        &:focus {
            outline: none;
        }
        &:active {
            outline: none;
        }
    }
}
.form-input {
    @include greyforminput;
}
</style>