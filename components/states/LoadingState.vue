<template>
  <div class="ld-container">
    <div class="lds-hourglass"></div>
  </div>
</template>

<style lang="scss" scoped>
.ld-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
}

.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 30px;
  padding: 20px 0;
  height: 30px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 6px;
  box-sizing: border-box;
  border: 10px solid $primary;
  border-color: $primary transparent $primary transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>