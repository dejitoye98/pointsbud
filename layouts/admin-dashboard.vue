<template>
  <div class="layout">
    <div class="layout__container">
      <div class="sidebar">
        <AdminSidebar></AdminSidebar>
      </div>
      <div class="main">
        <Nuxt />
      </div>
    </div>
  </div>
</template>


<style lang="scss">
.layout {
  height: 100%;
  width: 100%;
  background: $dashboard-background-color;

  &__container {
    display: flex;
    justify-content: space-between;
  }
}

.sidebar {
  height: 100%;
  width: 220px;
}
.main {
  width: 100%;
}
</style>