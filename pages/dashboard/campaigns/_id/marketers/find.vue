<template>
    <div class="find">
        <template>
            <div class="container">
                <div class="find__body">
                    <div class="filter">
                        <div class="filter__header">Filter</div>
                        <div class="filter__item">
                            <label for>Name</label>
                            <input v-model="filter.name" type="text" />
                        </div>
                        <div class="filter__item">
                            <label for>Industry</label>
                            <select type="text" v-model="filter.industry">
                                <option selected></option>
                                <option
                                    v-for="(industry, index) in industries"
                                    :key="index"
                                    :value="industry.id"
                                >
                                    {{ industry.name }}
                                </option>
                            </select>
                        </div>
                        <!--
                            <div class="filter__item">
                                <label for="" class="grand">Score</label>
                                <div class="flex-row">
                                    <div class="display: flex; flex-direction:column">
                                        <label for="">Min</label>
                                        <input type="number">
                                    </div>
                                    
                                    <div class="display: flex; flex-direction:column">
                                        <label for="">Max</label>
                                        <input type="number">
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="filter__item">
                                <label for="" class="grand">Popularity on</label>
                                <select>
                                    <option>Facebook </option>
                                    <option>Instagram</option>
                                    <option>LinkedIn</option>
                                    <option>Twitter</option>
                                    <option>TikTok</option>
                                    <option>Youtube</option>
                                </select>
            </div>-->
                        <button @click="actionFilter">Filter</button>
                    </div>
                    <div class="content">
                        <div class="content__container">
                            <template v-if="!loading">
                                <div
                                    class="content__item"
                                    v-for="(marketer, index) in marketers"
                                    :key="index"
                                    @click="openProfile(marketer)"
                                >
                                    <div
                                        class="content__item__image"
                                        style="margin-right: 10px"
                                    >
                                        <img
                                            v-if="marketer.profile_photo"
                                            :src="marketer.profile_photo"
                                            alt
                                        />
                                        <img
                                            v-else
                                            src="https://st4.depositphotos.com/1012074/25277/v/600/depositphotos_252773324-stock-illustration-young-avatar-face-with-sunglasses.jpg'"
                                            alt
                                        />
                                    </div>
                                    <div class="content__item__details">
                                        <p>{{ marketer.name }}</p>
                                        <p>{{ marketer.bio }}</p>
                                    </div>

                                    <div class="content__item__cta">
                                        <button
                                            @click="inviteMarketer(marketer.id)"
                                        >
                                            Invite
                                        </button>
                                    </div>
                                </div>
                            </template>
                            <template>
                                <div style="height: 100%">
                                    <Loading
                                        :show="loading"
                                        :cancel_interval="!loading"
                                    />
                                </div>
                            </template>
                        </div>
                        <div style="padding-left: 16px">
                            <pagination
                                v-if="current_page"
                                :records="(page_info && page_info.total) || 0"
                                v-model="current_page"
                                :per-page="page_info.page_size"
                                @paginate="paginate"
                            ></pagination>
                        </div>
                    </div>

                    <div class="profile-view">
                        <ProfileView
                            v-if="selected_user_id"
                            user_type="marketer"
                            :user_id="selected_user_id"
                            @onAction="inviteMarketer"
                        />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import Pagination from "vue-pagination-2";

export default {
    layout: "dashboard-with-topbar",
    name: "FindMarketersModal",
    props: ["campaign", "show", "invitations"],

    components: {
        Pagination,
    },
    created() {
        this.$store.commit("dashboard/setDashboardTitle", "Find Marketers");
    },
    mounted() {
        this.getIndustries();
        this.getMarketers();
    },
    computed: {
        computedQuery() {
            return {
                page: this.current_page,
                ...this.filter,
            };
        },
    },
    data() {
        return {
            filter: {
                name: "",
                industry: "",
            },
            campaign_id: this.$route.params.id,
            selected_user_id: null,
            loading: true,
            page_info: {},
            marketers: [],
            current_page: 1,
            industries: [],
            show: false,
        };
    },
    methods: {
        actionFilter() {
            this.loading = true;
            let url = `/marketers/filter?for_campaign_id=${this.campaign_id}`;
            url += this.computeQuery();

            this.$api
                .get(url)
                .then((resp) => {
                    this.marketers = resp.data.data.list;
                    this.page_info = resp.data.data.page_info;
                    this.current_page = this.page_info.current_page;
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                });
        },

        getIndustries() {
            this.$api.get("/industries").then((resp) => {
                this.industries = resp.data.data;
            });
        },
        openProfile(user) {
            this.selected_user_id = user.id;
        },
        computeQuery() {
            let querystring = "";
            if (this.computedQuery) {
                Object.keys(this.computedQuery).forEach((key, index) => {
                    if (this.computedQuery[key]) {
                        querystring += `&${key}=${this.computedQuery[key]}`;
                    }
                });
            }
            return querystring;
        },
        paginate() {
            //th
            this.getMarketers();
        },
        inviteMarketer(marketer_id) {
            const payload = {
                campaign_id: this.campaign_id,
                marketer_id: marketer_id,
            };

            this.$api
                .post(`/campaigns/${this.campaign_id}/invite`, payload)
                .then((resp) => {
                    this.marketers = this.marketers.filter(
                        (m) => m.id !== marketer_id
                    );
                    this.$store.commit(
                        "dashboard/setActionFindMarketers",
                        false
                    );
                    this.$store.dispatch("dashboard/actionShowSuccessToast", {
                        message: "Marketer was invited successfully",
                    });
                })
                .catch((err) => {
                    const error =
                        (err.response && err.response.data.data) || err;
                    this.$store.dispatch("dashboard/actionShowErrorToast", {
                        message: error,
                    }); // show error
                });
        },
        getMarketers() {
            this.loading = true;
            let url = "/marketers?for_campaign_id=" + this.campaign_id;
            if (this.computeQuery()) {
                url += this.computeQuery();
            }
            this.$api
                .get(url)
                .then((resp) => {
                    this.marketers = resp.data.data.list;
                    this.page_info = resp.data.data.page_info;
                    this.current_page = this.page_info.current_page;
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                });
        },
        close() {
            this.$store.commit("dashboard/setActionFindMarketers", false);
        },
        goToCampaign() {
            this.$router.push(`/dashboard/campaigns/${this.campaign_id}`);
        },
    },
    watch: {
        campaign(value) {
            this.show = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.profile-view {
    padding: 0px 16px;
    width: 30%;
}

:deep(.pagination) {
    display: flex;
    width: auto;
    justify-content: flex-start;
    align-items: center;
    height: 5rem;
    // margin: 3rem;
    border-radius: 0.6rem;
    //background: #ffffff;

    ul {
        height: auto;
        //box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    }
    li {
        background: white;
        //border: 1px solid grey;
        cursor: pointer;
        color: grey;
        width: 2.6rem;
        height: 2.6rem;
        //border-radius: 0.4rem;
        //background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    }
    p {
        color: grey;
        font-size: 14px;
    }
}

:deep(.VuePagination) {
    p {
        color: grey;
        font-size: 14px;
    }
}
.find {
    background: white;
    &__header {
        font-size: 30px;
        color: $faint;
    }
    &__body {
        display: flex;
    }
}
.container {
    //display: flex;
    //width: 90%;
    //margin: auto;
    //background: white;
    padding: 50px 32px;
    max-width: 100% !important;
}

.flex-row {
    display: flex;
    input {
        width: 45%;
    }
}
.filter {
    max-width: 20%;
    padding: 0 16px;
    border-right: 0.5px solid rgba(211, 211, 211, 0.275);
    font-size: 14px;
    overflow: scroll;
    //position: fixed;
    //margin-right: 700px;
    &__header {
        background: rgba(211, 211, 211, 0.256);
        text-align: center;
        padding: 8px 8px;
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: 500;
    }
    &__item {
        @include plain-form-input;
        color: $faint;
        display: flex;
        flex-direction: column;

        .grand {
            background: rgba(211, 211, 211, 0.256);
            padding: 8px 1px;
            text-align: center;
            margin-bottom: 8px;
        }
        label {
            color: $faint;
            font-size: 14px;
        }
        input {
            //border: 0.5px solid lightgrey;
            padding: 2px 3px !important;
            height: auto !important;
            max-height: auto !important;
        }
    }

    button {
        @include smallbutton;
        border-radius: 5px !important;
        width: 100% !important;
    }
}

.content {
    width: 65%;
    //margin: auto;
    color: $faint;
    border-right: 0.5px solid rgba(211, 211, 211, 0.275);

    //overflow-x: scroll;
    &__container {
        padding: 0 24px 0;
        width: 100%;
        max-height: 75vh;
        overflow: scroll;
        box-sizing: border-box;
    }

    &__item {
        //border: 1px solid red;
        display: grid;
        padding: 16px 0 16px 16px;
        box-sizing: border-box;
        height: 100px;
        cursor: pointer;
        align-items: center;
        grid-template-columns: 20px 600px 30px;
        //grid-template-rows: 50px 50px 50px 50px;
        grid-gap: 50px;
        //justify-content: space-between;
        width: 100%;
        font-size: 14px;
        //margin-bottom: 8px;
        border-bottom: 0.5px solid rgba(211, 211, 211, 0.275);

        &:hover {
            background-color: $dashboard-background-color;
        }

        &__image {
            //display: block;
            height: 50px;
            width: 50px;
            //margin-right: 100px;

            //border: 1px solid pink;
            border-radius: 50%;
            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        &__score {
            vertical-align: middle;
            display: flex;
            align-items: center;
        }

        &__details {
            display: flex;
            flex-direction: column;
            justify-content: center;
            max-height: 46px;
            p {
                font-size: 17px;
                &:last-of-type {
                    font-size: 15px;
                    font-weight: 300;
                    overflow: hidden;
                }
            }
        }
        &__cta {
            display: flex;
            align-items: center;
            justify-content: center;

            button {
                @include editbutton;
            }
        }

        p {
            &:first-of-type {
                color: black;
            }
        }
    }
}
</style>
