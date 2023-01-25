<template>
  <BaseModal>
    <template #body>
      <div class="refund-modal">
        <div class="refund-modal__header">
          <p>Refunds</p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L7 7" stroke="#808080" stroke-width="0.5" stroke-linecap="round" />
            <path d="M7 1L1 7" stroke="#808080" stroke-width="0.5" stroke-linecap="round" />
          </svg>
        </div>
        <div class="refund-modal__body">
          <p>
            When you order a product, you'll be taken to your
            <span
              class="bold primary"
            >Afflee customer dashboard</span>.
          </p>
          <img src="../../../static/customerdashboardsnippet.png" />
          <ul>
            <li>You can track the status of your order.</li>
            <li>Request for a refund up to 2 days after the expected delivery date if there's an issue with your delivery.</li>
          </ul>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.primary {
  background: transparent;
  color: $primary;
}
.refund-modal {
  background: white;
  &__header {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 10px solid whitesmoke;
    svg {
      cursor: pointer;
    }
  }
  &__body {
    padding: 16px;
    .bold {
      font-weight: 700;
    }
    p,
    ul {
      line-height: 1.4;
      color: $charcoal;
      font-size: 14px;
      margin-bottom: 15px;
      margin-left: 16px;
    }
    li {
      list-style: disc;
      font-weight: 500;
      margin-bottom: 8px;
    }
  }
}
</style>