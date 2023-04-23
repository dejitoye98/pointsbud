<template>
    <div class="settings">
        <div class="settings__container">
            <BaseModal v-if="add_user" @close="add_user = false">
                <template #footer>
                    <button @click="addUser">Add user</button>
                </template>
                <template #header>
                    <p>Add user</p>
                </template>

                <template #body>
                    <div class="adduser-modal">
                        <div class="form-input">
                            <label for="">Name</label>
                            <input v-model="new_user.name" type="text">
                        </div>

                        <div class="form-input">
                            <label for="">Email</label>
                            <input v-model="new_user.email" type="text">
                        </div>
                    </div>
                </template>
            </BaseModal>
            <div class="settings__navigation">
                <div class="menu-item nav-selected" @click="changeActiveTab('spaces')"
                    :class="[computedNavClass('spaces')]">

                </div>
                <div class="menu-item nav-selected" @click="changeActiveTab('menu')"
                    :class="[computedNavClass('QR Codes')]">
                    QR Codes
                </div>
                <div class="menu-item nav-selected" @click="changeActiveTab('users')" :class="[computedNavClass('users')]">
                    Users
                </div>
                <div class="menu-item nav-selected" @click="changeActiveTab('spaces')" :class="[computedNavClass('users')]">
                    Spaces
                </div>
                <div class="menu-item nav-selected" @click="changeActiveTab('banks')" :class="[computedNavClass('banks')]">
                    Banks
                </div>
            </div>

            <template v-if="activeTab === 'menu'">

                <div class="menuqr">
                    <div class="menuqr__navigation">
                        <!-- <button>Save</button>
                        <button>Download</button> -->
                        <div class="menuqr__spaces">
                            <ul>
                                <li @click="changeSpaceQRView('general')"
                                    :class="[selected_space_qr === 'general' ? 'selected_space_qr' : '']">General design
                                </li>
                                <li @click="changeSpaceQRView(space.name)" v-for="(space, index) in spaces"
                                    :class="[selected_space_qr === space.name ? 'selected_space_qr' : '']" :key="index">{{
                                        space.name }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="menuqr__container">
                        <div class="menuqr__header">
                            <div class="menuqr__header__logo">
                                <img src="https://i.ibb.co/XJ4nNjb/62909-C67-617-A-4-EF8-91-C0-45-D06-F471-F87.png" alt="">
                            </div>

                            <div class="menuqr__header__text">
                                <p style="text-align: center;">Scan to order from our menu
                                </p>
                                <p>and earn <span style="font-weight: 700; font-size: 25px;">
                                        discount points</span>
                                    for
                                    each
                                    purchase</p>
                            </div>
                        </div>


                        <div class="menuqr__qr">
                            <QrCode :text="qrData" />
                        </div>

                        <div class="menuqr__socials">
                            <p class="menuqr__socials__header">
                                We are social
                            </p>
                            <div class="menuqr__socials__links">
                                <div style="display: flex;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z"
                                            fill="white" />
                                    </svg>
                                    circa_lagos

                                </div>
                                <div style="display: flex;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.283 20.263C15.83 20.263 19.959 14.004 19.959 8.586C19.959 8.41 19.959 8.234 19.951 8.058C20.7551 7.47532 21.4489 6.75406 22 5.928C21.2496 6.25954 20.4544 6.47824 19.64 6.577C20.498 6.06329 21.1405 5.25562 21.448 4.304C20.6415 4.78246 19.7586 5.11837 18.838 5.297C18.4548 4.88758 17.9916 4.56121 17.4771 4.3381C16.9626 4.115 16.4078 3.99993 15.847 4C14.7583 4.00079 13.7143 4.43364 12.9445 5.2035C12.1746 5.97335 11.7418 7.01726 11.741 8.106C11.741 8.426 11.781 8.738 11.845 9.042C10.2129 8.96004 8.61627 8.53575 7.15879 7.79667C5.7013 7.05759 4.41555 6.02025 3.385 4.752C2.86128 5.65655 2.70141 6.72651 2.93783 7.74464C3.17426 8.76278 3.78927 9.65279 4.658 10.234C4.00708 10.2115 3.37059 10.0361 2.8 9.722V9.778C2.80088 10.7253 3.12873 11.6433 3.72816 12.3768C4.32759 13.1103 5.16186 13.6144 6.09 13.804C5.73825 13.901 5.37488 13.9495 5.01 13.948C4.745 13.948 4.489 13.924 4.24 13.876C4.50164 14.6918 5.01201 15.4053 5.69958 15.9164C6.38714 16.4275 7.21742 16.7106 8.074 16.726C6.62055 17.8686 4.82477 18.4885 2.976 18.486C2.648 18.486 2.32 18.47 2 18.43C3.87671 19.6276 6.05673 20.2636 8.283 20.263Z"
                                            fill="white" />
                                    </svg>

                                    circa_lagos

                                </div>
                            </div>
                        </div>

                        <div class="" color="black">
                            <p style="color: black; margin-top: 8px; font-size: 18px; font-weight:600"> {{ selected_space_qr
                            }}</p>
                        </div>


                        <div class="menuqr__attribution">
                            <p style="margin-right: 8px;">Courtesy of</p>
                            <img src="../../../../static/pointsfavicon.png" alt="">
                            <p>PointsBud.com</p>
                        </div>

                    </div>
                </div>


                <div class="props">
                    <div class="props__container">
                        <div class="props__header">
                            Edit properties
                        </div>

                        <div class="props__item">
                            <div class="props__item__header">
                                Background Color
                            </div>
                            <div class="props__item__box"></div>
                        </div>
                    </div>
                    <div class="props__container">
                        <div class="props__item">
                            <div class="props__item__header">
                                Text Color
                            </div>
                            <div class="props__item__box props__item__box--white"></div>
                        </div>
                    </div>
                </div>

            </template>

            <template v-if="activeTab === 'users'">
                <div class="users">
                    <div class="users__header">
                        <button @click="add_user = true">Add user</button>
                    </div>
                    <BaseTable>
                        <template #header v-if="users">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                        </template>

                        <template #data v-if="users">
                            <tr v-for="(user, index) in users" :key="index">
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.role_id }}</td>
                                <td>{{ user.status }}</td>
                            </tr>
                        </template>
                    </BaseTable>
                </div>
            </template>



            <template v-if="activeTab === 'spaces'">
                <div class="spaces">
                    <div class="spaces__container">
                        <div class="spaces__header">
                            <button @click="saveSpaces">Save Changes</button>
                        </div>
                        <div class="spaces__content">

                            <div class="spaces__item" v-for="(space, index) in spaces" :index="index">
                                <div class="spaces__item__input-box">
                                    <input placeholder="space name" v-model="space.name">
                                    <input placeholder="price" v-model="space.price">
                                    <input placeholder="description" v-model="space.description">
                                </div>
                                <div class="space__item__footer">
                                </div>
                            </div>
                            <div class="spaces__item spaces__item--add" @click="addNewSpace">
                                Add a new space
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template v-if="activeTab === 'banks'">
                <div class="banks">
                    <div class="banks__container">
                        <div class="banks__item" v-for="(acc, index) in banks" :key="index">
                            <p>{{ acc.bank_name }}</p>
                            <p>{{ acc.account_number }}</p>
                            <p v-if="acc.is_primary"> IsPrimary</p>
                        </div>
                        <div class="form">
                            <div class="form-input">
                                <p class="error">{{ error }}</p>
                                <label>Bank</label>
                                <select v-model="bank.bank_shortcode">
                                    <option v-for="bank in bankList" :key="bank.name" :value="bank.code"> {{ bank.name }}
                                    </option>
                                </select>

                            </div>
                            <div class="form-input">
                                <p class="error">{{ error }}</p>
                                <label>Account Number</label>
                                <input type="number" v-model="bank.account_number" />
                            </div>

                            <div style="display: flex;justify-content:flex-end">
                                <button class="button" @click="addBankAccount">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>



        </div>
    </div>
</template>

<script>
import QrCode from "vue-qr-generator";
import ColorPicker from '@radial-color-picker/vue-color-picker';
import { mapGetters } from 'vuex';


export default {
    layout: 'admin-dashboard',
    components: { QrCode, ColorPicker },

    created() {
        this.getBusiness()
        this.changeActiveTab('menu')
    },
    data() {
        return {
            value: "http://localhost:3000",
            size: 640,

            color: "white",

            activeTab: 'menu',

            add_user: false,
            users: null,
            new_user: {
                name: '',
                email: '',
                role_id: ''
            },

            roles: [],

            spaces: [],
            edited_spaces: false,
            selected_space_qr: 'general',

            qr_properties: {
                height: '200px',
                width: '200px'
            },
            business: null,

            bank: {
                account_number: '',
                bank_name: '',
                bank_shortcode: '',
                is_primary: 0
            },

            banks: []


        }
    },
    watch: {
        spaces(val) {
            if (val) {
                this.edited_spaces = false
            }
        }
    },
    computed: {
        ...mapGetters('banks', ['bankList']),

        qrData() {
            if (this.business) {

                if (this.selected_space_qr !== 'general') {
                    return "https://www.pointsbud.com/menu?space=" + this.selected_space_qr
                }
                else {
                    return "https://www.pointsbud.com/menu/" + this.business.slug
                }
            }
        }
    },
    methods: {
        getBusiness() {
            this.$api.get('/auth/admin/self').then(resp => {
                this.business = resp.data.data;
            })
        },
        changeSpaceQRView(space) {
            this.selected_space_qr = space
        },
        addNewSpace() {
            this.spaces.push({
                name: ''
            })
        },
        getSpaces() {
            this.$api.get('/spaces').then(resp => {
                this.spaces = resp.data.data
            })
        },
        saveSpaces() {
            this.$api.post('/spaces', { items: this.spaces }).then(resp => {
                this.getSpaces()
            })
        },
        getBanks() {
            this.$api.get('/bank-accounts').then(resp => {
                this.banks = resp.data.data
            })
        },
        addBankAccount() {

            const payload = this.bank
            const bank = this.bankList.find(b => b.code === payload.bank_shortcode);
            payload.bank_name = bank.name;
            //payload.bank_shortcode = this.banks[this.bank.bank_name]

            if (!payload.account_number || !payload.bank_name || !payload.bank_shortcode) {
                this.error = "Please enter all fields"
                return false
            }
            this.$api.post('/bank-accounts', payload).then(resp => {
                this.bank = {
                    account_number: '',
                    bank_name: '',
                    bank_shortcode: '',
                    is_primary: ''
                }

                // this.$emit('reloadBankAccountsList', true)
            })

        },
        onInput() {
            alert('seter')
        },
        getUsers() {
            this.$api.get(`/admin-users`).then(resp => {
                this.users = resp.data.data;
            })
        },
        computedNavClass(item) {
            if (this.activeTab === item) return "nav-selected"
        },
        changeActiveTab(item) {
            this.activeTab = item;

            if (item === 'users' && !this.users) {
                this.getUsers()
            }
            else if (item === 'spaces' && this.spaces.length === 0) {
                this.getSpaces()
            }
            else if (item === 'banks' && this.banks.length === 0) {
                this.getBanks();
            }
            if (item === 'menu' && this.spaces.length === 0) {
                this.getSpaces()
                return;
            }
        },

        addUser() {
            //todo
            this.$api.post('/admin-users', {
                ...this.new_user
            }).then(resp => {
                this.getUsers()
                this.add_user = false;
            })

        }
    }
}

</script>

<style lang="scss" scoped>
@import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';


.selected_space_qr {
    color: goldenrod !important;
    font-size: 20px;

}



.banks {
    &__container {
        padding: 64px 0;
    }

    &__item {
        padding: 24px;
        background: white;
        margin-bottom: 16px;
    }
}

.form {
    @include card;
    padding: 16px;

    button {

        @include smallbutton
    }

}

.form-input {
    @include plain-form-input;
}


.users {
    button {
        @include smallbutton;
    }

    &__header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 16px;
    }
}

.menuqr {
    color: white;
    width: 100%;
    cursor: pointer;
    margin: auto;
    //max-height: 100%;
    position: relative;
    height: 500px !important;
    width: 500px !important;
    padding: 16px !important;

    &__socials {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 16px;

        &__header {
            font-size: 25px;

        }

    }

    &__spaces {


        ul {
            display: flex;
            justify-content: space-between;
        }

        li {
            margin-right: 8px;
            color: white;
            border-right: 1px solid grey;
            padding-right: 16px;

            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }

        }
    }

    &__attribution {
        bottom: 0;
        left: 0;
        margin-top: 32px !important;
        color: rgb(230, 230, 230);
        background: rgba(0, 0, 0, 0.363);
        font-weight: bold;
        display: flex;
        padding: 4px 8px;
        align-items: center;
        font-size: 13px;
        border-radius: 2px;
        text-align: center;
        display: flex;
        justify-content: center;


        img {
            margin-right: 8px;
            width: 18px;
            height: 18px;
        }
    }

    &__navigation {
        //border: 1px solid grey;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;

        button {
            @include smallbutton;
            background-color: $primary;
            //border: 1px solid teal;
            color: white;

            margin-right: 16px;

            &:hover {
                background: teal;
                color: white;
            }

        }
    }


    &__container {
        background-color: black;
        border-radius: 10px;
        //  background-image: url('../../../../static/backgroun.png');



        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__header {
        max-width: 600px;
        //margin-bottom: 24px;

        &__text {
            font-size: 20px;
            font-weight: 700;
            //line-height: 1.2;
            text-align: center;
            display: block;
            color: white;
        }

        p {
            &:last-child {
                font-size: 18px;
                font-weight: 400;
                color: white !important;
                // margin-top: 20px;
                margin-bottom: 20px;
            }
        }

        &__logo {
            //border: 2px dashed white;
            border-radius: 10px;
            height: 150px;
            width: 150px;
            margin: auto;
            //margin-bottom: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            //padding: 8px;
            border-radius: 5px;

            img {
                border-radius: 20px;
            }
        }
    }

    &__qr {
        padding: 16px;
        background: white;
        border-radius: 20px;
        height: 150px;
        width: 150px;
    }

    &__footer {
        text-align: center;
        margin-top: 32px;
        font-size: 20px;
        max-width: 500px;
    }
}

.settings {
    &__container {
        display: grid;
        grid-template-columns: 18% 60% 19%;
        justify-content: space-between;
        margin-top: 64px;

    }

    &__navigation {
        display: flex;
        flex-direction: column;
        margin: 64px 0;
        @include card;
        max-height: fit-content;
        padding: 16px;
    }

    .menu-item {
        padding: 16px;
        color: $charcoal;
        cursor: pointer;

        &:hover {
            background: whitesmoke;
        }

    }
}


.props {
    background: white;
    margin: 64px 0;


    &__header {
        font-size: 16px;
        padding: 16px;
        border-bottom: 1px solid whitesmoke;
    }

    &__item {
        display: flex;
        flex-direction: column;
        padding: 16px;

        margin-bottom: 16px;

        &__header {
            font-size: 16px;
            color: $charcoal;
        }

        &__box {

            width: 50px;
            height: 50px;
            border-radius: 10px;
            background: $charcoal;
            border: 1px solid grey;
            cursor: pointer;

            &--white {
                background: white;
            }
        }

    }
}

.nav-selected {
    color: $primary;
}

.adduser-modal {
    width: 400px;
    padding: 16px;

    .form-input {
        @include plain-form-input;
    }
}

.spaces {

    &__container {
        margin: 64px 0;


    }

    &__header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 16px;

        button {
            @include smallbutton;
        }
    }

    &__content {
        display: grid;
        grid-template-columns: 30% 30% 30%;
        justify-content: space-between;
    }

    &__item {
        background: white;
        margin-bottom: 16px;

        width: 100%;
        padding: 24px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__input-box {
            input {
                @include plain-form-input;
                text-align: center;
                border: 1px dashed whitesmoke;

                &:focus {
                    outline: 0;
                }

                &:active {
                    outline: 0;
                }
            }
        }

        button {
            @include smallbutton;
        }

        &--add {
            background: gold;
            font-size: 20px;

            &:hover {
                transform: scale(1.1);
            }
        }
    }
}
</style>