<template>
    <div style="width: 100%">
        <Modal classes="half-body" title="Find marketers" @close="close">
            <template>
                <div class="container">
                    <div class="filter">
                        <div class="filter__item">
                            <label for="">Name</label>
                            <input type="text" />
                        </div>
                        <div class="filter__item">
                            <label for="">Industry</label>
                            <select type="text">
                                <option selected></option>
                                <option
                                    v-for="(industry, index) in industries"
                                    :key="index"
                                >
                                    {{ industry }}
                                </option>
                            </select>
                        </div>
                        <div class="filter__item">
                            <label for="" class="grand">Score</label>
                            <div class="flex-row">
                                <div
                                    class="display: flex; flex-direction:column"
                                >
                                    <label for="">Min</label>
                                    <input type="number" />
                                </div>

                                <div
                                    class="display: flex; flex-direction:column"
                                >
                                    <label for="">Max</label>
                                    <input type="number" />
                                </div>
                            </div>
                        </div>
                        <div class="filter__item">
                            <label for="" class="grand">Popularity on</label>
                            <select>
                                <option>Facebook</option>
                                <option>Instagram</option>
                                <option>LinkedIn</option>
                                <option>Twitter</option>
                                <option>TikTok</option>
                                <option>Youtube</option>
                            </select>
                        </div>
                        <button>Filter</button>
                    </div>
                    <div class="content">
                        <div class="content__container">
                            <div
                                class="content__item"
                                v-for="(marketer, index) in marketers"
                                :key="index"
                            >
                                <div
                                    class="content__item__image"
                                    style="margin-right: 10px"
                                >
                                    <img
                                        v-if="marketer.profile_photo"
                                        :src="marketer.profile_photo"
                                        alt=""
                                    />
                                    <img
                                        v-else
                                        src="https://st4.depositphotos.com/1012074/25277/v/600/depositphotos_252773324-stock-illustration-young-avatar-face-with-sunglasses.jpg'"
                                        alt=""
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
                        </div>
                        <pagination
                            v-if="current_page"
                            :records="(page_info && page_info.total) || 0"
                            v-model="current_page"
                            :per-page="page_info.page_size"
                            @paginate="paginate"
                        ></pagination>
                    </div>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script>
import Pagination from "vue-pagination-2";

import Modal from "../Modal";
export default {
    name: "FindMarketersModal",
    props: ["campaign", "show", "invitations", "campaign_id"],

    components: {
        Modal,
        Pagination,
    },
    mounted() {
        this.getMarketers();
    },
    computed: {
        computedQuery() {
            return {
                page: this.current_page,
            };
        },
    },
    data() {
        return {
            loading: true,
            page_info: {},
            marketers: [],
            current_page: 1,
            industries: [
                "Arts and Entertainment",
                "Automotive",
                "Beauty and Fitness",
                "Books and Literature",
                "Business and Industrial Markets",
                "Computer and Electronics",
                "Finance",
                "Food and Drink",
                "Games",
                "Healthcare",
                "Hobbies and Leisure",
                "Home and Garden",
                "Internet and Telecommunication",
                "Jobs and Education",
                "Law and Government",
                "News",
                "Online Communities",
                "People and Society",
                "Pets and Animals",
                "Real Estate",
                "Reference",
                "Science",
                "Shopping",
                "Sports",
                "Travel",
                "Other",
            ],
            show: false,
        };
    },
    methods: {
        computeQuery() {
            let querystring = "";
            if (this.computedQuery) {
                Object.keys(this.computedQuery).forEach((key, index) => {
                    querystring += `&${key}=${this.computedQuery[key]}`;
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
.container {
    display: grid;
    grid-template-columns: 20% 50% 30%;
}

.flex-row {
    display: flex;
    input {
        width: 45%;
    }
}
.filter {
    max-width: 400px;
    border-radius: 1px solid lightgrey;
    font-size: 14px;

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
    width: 90%;
    margin: auto;
    color: $faint;
    //overflow-x: scroll;
    &__container {
        padding: 0 24px 0 30px;
        width: 100%;
    }

    &__item {
        //border: 1px solid red;
        display: grid;
        grid-template-columns: 20px 400px 30px;
        //grid-template-rows: 50px 50px 50px 50px;
        grid-gap: 50px;
        //justify-content: space-between;
        width: 100%;
        font-size: 14px;
        margin-bottom: 8px;

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
                &:last-of-type {
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
