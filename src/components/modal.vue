<template>
  <div>
  <div class="b-button" @click="showModal()">
        <slot name='modal-action'></slot>
  </div>
  <div v-if="show" class="modal">
    <div @click="closeModal()" class="modal-bg"></div>
    <div class="modal__container">

      <div class="modal__desctiption">Вы действительно хотите  <slot name='modal-action'></slot> пост</div>
      <div class="modal__btn">
        <div @click="confirm()" class="b-btn">да</div>
        <div @click="closeModal()" class="b-btn b-btn--alternative">нет</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      show:false
    }
  },
  methods: {
    showModal(){
      this.show=true;
    },
    closeModal(){
      this.show=false;
    },
    confirm(){
      this.$emit("confirm");
    }
  }
}
</script>

<style lang="scss">
.modal{
  &-bg{
    background: rgba(0,0,0,0.7);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
  }
  &__container{
    background-color: white;
    border-radius: 5px;
    min-width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    z-index: 100;
    padding: 30px;
    transform: translate(-50%, -50%);
  }
  &__desctiption{
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  &__btn{
    display: flex;
    justify-content: space-around;
  }
}
.b-btn{
  min-width: 45%;
  background-color: white;
  border-radius: 5px;
  text-align: center;
  height: 30px;
  border: 1px solid #E3E3E3;
  line-height: 30px;
  cursor: pointer;
  &--alternative{
    background-color:#E3E3E3;
  }
}
</style>