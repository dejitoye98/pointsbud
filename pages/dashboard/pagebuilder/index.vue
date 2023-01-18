<template>
    <div class="page">
        <div class="sidebar">
            <ElementsSelector />
        </div>

        <div class="body">
            <div class="topbar">
                <div
                    v-for="(item, index) in builderOptions"
                    :key="index"
                    class="creator-options"
                >
                    <BuilderCreatorOption
                        :image="item.image"
                        :name="item.name"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BuilderCreatorOption from "../../../components/pagebuilder/BuilderCreatorOption";
import ElementsSelector from "../../../components/pagebuilder/ElementsSelector";
export default {
    layout: "dashboard",
    components: {
        BuilderCreatorOption,
        ElementsSelector,
    },
    data() {
        return {
            builderOptions: [
                { name: "Form", image: "./../../static/form.png" },
                {
                    name: "Landing Page",
                    image: "../../static/landing-page.png",
                },
                { name: "Sales Page", image: "./../../static/sales-page.png" },
            ],
        };
    },
    created() {
        this.$store.commit("dashboard/setDashboardTitle", "Page Builder");
    },
};
</script>

<style lang="scss" scoped>
.creator-options {
    display: flex;
    //padding: 8px 16px;
}
.page {
    display: flex;
    justify-content: space-between;
}

.topbar {
    //min-height: 50px;
    background: white;
    width: 100%;
    display: flex;
    //justify-content: space-between;
    border-bottom: 1px solid rgba(211, 211, 211, 0.442);
    padding: 8px 16px;
}
.sidebar {
    width: 10%;
    height: 100%;
    background: white;
}

.body {
    width: 90%;
    background: white;
}
</style>
