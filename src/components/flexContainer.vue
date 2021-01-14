<template>
  <div class="app-flex-container">
    <div class="container-header">
      <slot name="header"></slot>
    </div>
    <div class="container-main">
      <slot></slot>
    </div>
    <div class="container-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style lang="scss">
  .app-flex-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .container-main {
      flex: 1;
      overflow: auto;
      position: relative;
    }

    .container-footer {
      .app-modal-footer-button {
        float: right;
        margin: 8px 8px 8px 0;
        border-radius: 15px;
      }
    }
  }
</style>
