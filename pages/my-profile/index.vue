<template>

<div class="profile">


    <template v-if="userContext === 'marketer' && view === 'private'">
        <div class="profile__container card">

            <div class="">
                <div class="profile__image__container">
                <div style="width: 100%; justify-content: flex-end; display: flex;">
                    <button class="switch" @click="switchView">Switch to Public View</button>
                </div>
                    <div class="profile__image-box">
                        <div class="image-overlay">
                            <button @click="changeImage">Change</button>
                        </div>
                        <div class="profile__image">

                            <img :src="profile.profile_photo"/>
                        </div>

                    </div>
            </div>
            </div>
            <div class="profile__body">
                <div class="form-input form-input--full">
                    <label for="">Name</label>
                    <input type="text"  v-model="profile.name" disabled>
                </div>
                <div class="form-item">
                    <div class="form-input">
                        <label for="">Email Address</label>
                        <input type="text" v-model="profile.email" disabled>

                    </div>
                    <div class="form-input">
                        <label for="">Phone Number</label>
                        <input type="text" v-model="profile.contact_phone_number">
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-input">
                        <label for="">Occupation</label>
                        <input type="text" v-model="profile.occupation">

                    </div>
                    <div class="form-input">
                        <label for="">Industry</label>
                        <input type="text" v-model="profile.industry">

                    </div>
                </div>

                <div class="form-input form-input--full">
                    <label>Bio</label>
                    <textarea v-model="profile.bio"></textarea>
                </div>
                <div class="form-item" v-if="profile.socials">
                    <div class="form-input" v-for="(social, index) in Object.keys(socials)" :key="index">
                        <label for="">{{resolveSocialName(social)}} profile URL</label>
                        <input type="text" v-model="profile.socials[social]">
                    </div>
                    
                </div>
                <div class="edit" style="display: flex; justify-content:flex-end">

                    <button :disabled="!changesDetected" @click="editProfile">Edit Profile</button>
                </div>
            </div>
        </div>
    </template>
    <template v-if="userContext === 'marketer' && view === 'public'">
        <div class="profile__container card">

            <div class="">
                <div class="profile__image__container">
                <div style="width: 100%; justify-content: flex-end; display: flex;">
                    <button class="switch" @click="switchView">Switch to Private View</button>
                </div>
                    <div class="profile__image-box">
                        
                        <div class="profile__image">

                            <img :src="profile.profile_photo"/>
                        </div>

                    </div>
                </div>
            </div>
            <div class="profile__body">
                <div class="profile__bio">
                    <p>{{profile.bio}}</p>
                    <p>Active since: {{formatDate(profile.createdAt)}}</p>
                </div>

                <div class="profile__section">
                    <div class="profile__section__item">
                        <label for="">Name</label>
                        <p>{{profile.name}}</p>
                    </div>
                    <div class="profile__section__item">
                        <label for="">Email</label>
                        <p>{{profile.email}}</p>
                    </div>
                    <div class="profile__section__item">
                        <label for="">Occupation</label>
                        <p>{{profile.occupation}}</p>
                    </div>
                    <div class="profile__section__item">
                        <label for="">Industry</label>
                        <p>{{profile.industry}}</p>
                    </div>

                    <div class="profile__section" v-if="profile.socials">
                        <div class="profile__section__item" v-for="(social, index) in Object.keys(socials)" :key="index">
                            <label for="">{{resolveSocialName(social)}} profile URL</label>
                            <p>{{profile.socials[social] || 'unknown'}}</p>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    </template>
</div>
    
</template>


<script>
import moment from 'moment';
export default {
    layout: 'dashboard',
    data() {
        return {
            view: 'private',
            socials: {
                linkedIn: '',
                twitter: '',
                facebook: '',
                tiktok: '',
                instagram: '',
                youtube: ''
            },
            error: '',
            profile: {},
            original_profile: {}
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('MMM DD, YYYY')
        },
        switchView() {
            if (this.view === 'private') this.view = 'public';
            else this.view = 'private'
        },
        changeImage() {
            const el = document.createElement('input');
            el.type = 'file';
            el.accept = 'image/*';
            
            el.click();


            // set event listen
            el.addEventListener('change', () => {
                const file = el.files && el.files[0];
                const vm = this;

                const cloudinary_url = "https://api.cloudinary.com/v1_1/dx9vdtrxz/image/upload";
                try {

                    var xhr = new XMLHttpRequest();
                    var fd = new FormData();
                    
                    
                    xhr.open('POST', cloudinary_url, true);        
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        
                    xhr.onreadystatechange = function(e) {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                        // File uploaded successfully
                            var response = JSON.parse(xhr.responseText);

                            vm.profile.profile_photo = response.secure_url;
                            vm.$api.put('/users/self', {profile_photo: response.secure_url})
                        }
                        
                    }
        
                    fd.append('upload_preset', "jljh5lxc");
                    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
                    fd.append('file', file);
                    xhr.send(fd);
                } 
                catch(e) {
                    console.log(e)
                }
            })
        },
        editProfile() {
            if (this.validateLinks()) {
                const payload = this.profile;
                delete payload.name
                this.$api.put('/users/self', payload).then(resp=>{
                    this.$store.dispatch('dashboard/actionShowSuccessToast', {message: "Profile update successful"});
                    this.getProfile()
                })
            }
        },
        resolveSocialName(name){
            return name[0].toUpperCase() + name.slice(1)
        },
        getProfile() {
            this.$store.dispatch('auth/getAuthUser').then(resp=> {
                this.profile = resp.data.data;
                this.original_profile = JSON.parse(JSON.stringify(resp.data.data));
                if (!this.profile.socials) {
                    this.profile.socials = this.socials
                }
            }).catch(err => {
                this.err = err
            })
        },
        validateLinks() {
            let can_continue = true
            Object.keys(this.profile.socials).forEach(social=> {
                if (this.profile.socials[social]) {
                    if (!this.profile.socials[social].match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
                        can_continue = false;
                        this.$store.dispatch('dashboard/actionShowErrorToast', {message: "Social profile links should be valid urls"})
                    }
                }
            });
            return can_continue;
        }
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', 'Profile');
        this.$store.commit('dashboard/setActive', '');
        this.getProfile()
    },
    computed: {
        userContext() {
            return window.localStorage.getItem('afContext')
        },
        changesDetected() {
            let neglect = ['name'];
            let changes_detected = false
            Object.keys(this.profile).forEach(key => {
                if (!neglect.includes(key)) {
                    if (this.original_profile[key] !== this.profile[key]) {
                        changes_detected = true;
                    } 
                }
            })
            return changes_detected;
        }
    }
}
</script>

<style lang="scss" scoped>
.switch {
    @include smallbutton-white;
    color: $darkshade;
    cursor: pointer;
    border: 0;
    font-weight: 500;
    
    
}
.card {
    border-radius: 10px;
    width: 60%;
    //margin: auto;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    //padding: 16px 16px;
    border: 0.5px solid rgba(211, 211, 211, 0.442);
    display: flex;
    flex-direction: column;
    position: relative;

    @include media('<=dashbreak') {
        width: 90%;
    }
}
.profile {
    &__image-box {
        border-radius: 50%;
        width: 300px;
        height: 300px;
        margin: auto;
        //margin-top:
        //padding: 16px;
        position: relative;
        background: lightgrey;



        &__container {
            //background: $faint;
            position: relative;

            padding: 16px;;
        }
    }

    &__image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            //border: 5px solid lightgray;

            &__container {
                ///margin: 36px 0;
                padding: 36px 16px;
                background-image: linear-gradient(120deg, #E3A09E 0%, #96e6a1 100%);
                background-size: 100%;
                background-repeat: no-repeat;

                
            }

        }

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: lightgrey;
        }
        
    
    &__body {
        min-height: 200px;
        background: rgba(255, 255, 255, 0.597);
        padding: 16px;

        button {
            @include largebutton;
            width: auto;
        }
    }

    &__bio {
        width: 100%;
        margin-bottom: 16px;
        color: black;
        font-size: 16px;
        text-align: center;
        border-bottom: 1.5px solid rgb(90 97 129 / 5%);
        padding-bottom: 16px;

        
    }
    &__section {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        &__item {
            width: 48%;
            margin-bottom: 10px;
            text-align: center;

            label {
                color: black;
                font-weight: 500;
            }
            p {
                color: grey;
            }
        }
    }
}

.form-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    
}
.form-input {
    @include plain-form-input;
    width: 48%;
    &--full {
        width: 100%;
    }
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    width: 300px;
    height: 300px;
    background: transparent;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;

    button {
        border: 1.5px solid white;
        color: white;
        padding: 6px;
        border-radius: 8px;
        font-size: 14px;

        &:active {
            border: 2px solid white;
            font-size: 15px;
        }
    }

    &:hover {
        cursor: pointer;
        background: rgba(0, 0, 0, 0.407);
        z-index: 434;
        opacity: 1;
    }
}
</style>