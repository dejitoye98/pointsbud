<template>
    <div class="layout">
        <div class="sidebar">

            <AppSidebar/>
        </div>

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

.sidebar {
    
}
.body {
   // background:lightblue;
   width: 100%;
   height: 100%;
   padding: 0 24px;
}
</style>