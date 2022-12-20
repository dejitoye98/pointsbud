<template>
    <div class="page">
        <div class="header">

            <div class="header__container">
                <div class="logo">
                   <Logo/>
                </div>
            </div>
        </div>
        <div class="body">
            <h3 class="body__header">Accept invitation</h3>
            <span class="body__caption">Join your team on Afflee </span>
            <span class="error">{{error}}</span>
            <div class="body__container">
                <div class="body__form">
                    <div class="form-input">
                        <label>Full Name</label>
                        <input v-model="payload.user_name" type="text">
                    </div>
                    <div class="form-input">
                        <label>Email</label>
                        <input v-model="payload.email" disabled type="text">
                    </div>
                    <div class="form-input">
                        <label>Password</label>
                        <input v-model="payload.password" type="password">
                    </div>
                    <div class="form-input">
                        <label>Phone number</label>
                        <input v-model="payload.phone_number" type="number">
                    </div>
                    

                    <button :disabled="loading" @click="accept">Join Afflee!</button>
                </div>

            </div>
        </div>
    </div>

</template>


<script>


export default {
    data() {
        return {
            mode: 'accept',
            error: '',
            loading: false,
            forgot_success: false,
            payload: {
                email: this.$route.query.email,
                token: this.$route.query.token,
                user_name: '',
                password: '',
                phone_number: '',
            },
            
        }
    },
    computed: {
        
    },
    created(){
        // Execute a function when the user presses a key on the keyboard
        window.addEventListener("keypress", (event) => {
        // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                //document.getElementById("myBtn").click();
                this.register();
            }
        });
    },
    methods: {

        
        goHome() {
            this.$router.push('/')
        },
        accept() {
            if (!this.payload.email || !this.payload.password || !this.payload.user_name) {
                this.error = "Please enter all fields";
                return;
            }
            this.error = '';
            this.loading = true;
            this.$api.post('users/accept-invite', this.payload)
                .then(resp => {
                    this.error = '';
                    this.loading = false;
                    this.$store.dispatch('dashboard/actionShowSuccessToast', {message: "You've successfully signed up on Afflee"});
                    this.$router.push('/login')
                    this.$cookies.remove('aff-token', {path: ''})
                    
                    
                })
                .catch(err => {
                    this.loading = false;
                    this.error= err.response && err.response.data.data || err
                })
        },
        changeMode(mode) {
            this.mode = mode;
        },

        
        
    }
}
</script>

<style lang="scss" scoped>
.verify {
    text-align: center;
    margin-top: 50px;
    width: 100%;

    &__instruction {
        font-size: 16px;
        font-weight: 300;
        width: 90%;
        margin: auto;
        margin-bottom: 8px;
    }
    &__inputs {
        display: flex;
        width: 50%;
        justify-content: space-between;
        margin: auto;

        input {
            @include plain-form-input;
            width: 70px;
            height: 70px;
            display: block;
            border-radius: 5px;
            text-align:center;
            border: 2px solid lightgrey;

            @include media("<=t") {
                width:40px;
                height: 40px;
            }
            &:focus {
                outline-color: $primary;
            }
        }
    }
    button {
        @include largebutton;
    }

}
.button-container{ 
    width: 100%; display: flex; justify-content: center;
    @include media("<=t") {
        width: 80% !important;
        margin:auto;
    }
}

.header {
    //width: 80%;
    //margin: auto;
    padding: 16px 0;
    border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);

    &__container {
        @include container;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
}
 .logo{
    //margin-bottom: 40px;
    cursor: pointer;
    padding: 0 36px;

    img {
        object-fit: contain;
        height: auto;
        margin: auto;
        margin-bottom: 50px;
            width: 120px !important;
        margin: 0;
    }
}
.form-input {
    @include form-input;
}
.check-label {
    color: $faint;
    font-size: 14px;
    display: flex;
    align-items: center;
    
    input {
        margin-right: 5px;
    }
}

a { 
    color: $lightaccent;
    font-size: 14px;
}

.flex-row {
    display: flex;
    justify-content: space-between;
    margin-top: -12px;
    margin-bottom: 24px;

    @include media("<=t") {
        margin-bottom: 16px;
    }
}

.body {
    width: 50%;
    margin: auto;
    margin-top: 50px;

    @include media("<=t") {
        width: 70%;
    }
    &__caption {
        color: $faint;
        font-size: 14px;
        margin-bottom: 16px;
        display: block;
        text-align: center;
    }

    &__header {
        text-align: center;
        font-size: 30px;
        margin-bottom: 8px;
        font-weight: 600;

                                                                                                                                        
        @include media("<=t") {
            font-size: 20px;
        }

    }
    span {
        display: block;
        text-align: center;
    }

    &__container {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
    &__form {
        width: 100%;
    }
    button {
        @include largebutton;
        width: 100%;
    }
}

.error {
    @include error;
    font-size: 14px;
}
</style>