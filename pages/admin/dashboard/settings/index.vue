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
                                <img src="data:image/jpeg;base64,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"
                                    alt="">
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

                        <div class="" color="black">
                            <p style="color: black; margin-top: 8px; font-size: 18px; font-weight:600"> {{ selected_space_qr
                            }}</p>
                        </div>


                        <div class="menuqr__attribution">
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
    max-height: 100%;
    position: relative;

    &__spaces {


        ul {
            display: flex;
            justify-content: space-between;
        }

        li {
            margin-right: 8px;
            color: black;
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
        background-color: #ddaa44;
        border-radius: 10px;
        background-image: url('../../../../static/backgroun.png');



        padding: 64px 64px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__header {
        max-width: 500px;
        margin-bottom: 24px;

        &__text {
            font-size: 48px;
            font-weight: 700;
            line-height: 1.2;
            text-align: center;
            display: block;
            color: black;
        }

        p {
            &:last-child {
                font-size: 18px;
                font-weight: 400;
                color: black !important;
                margin-top: 20px;
                margin-bottom: 10px;
            }
        }

        &__logo {
            //border: 2px dashed white;
            border-radius: 10px;
            height: 100px;
            width: 100px;
            margin: auto;
            margin-bottom: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 8px;
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