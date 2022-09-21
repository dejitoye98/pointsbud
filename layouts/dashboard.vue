<template>
    <div class="layout">
        <AppSidebar/>

        <main class="body">
            <AppDashboardTopbar/>
            <div class="body__container">
                <Nuxt/>
            </div>
        </main>
    </div>
</template>


<style lang="scss" scoped>

.layout {
    display: flex;
    background: $dashboard-background-color;
}
.body {
   // background:lightblue;
   width: 100%;
   height: 100%;
}
</style>