<template>
  <div class="header">
    <div class="container header__container">
      <div class="menu-burger__header">
        <span></span>
      </div>
      <div class="header__nav">
        <div class="menu header__menu">
          <div class="header__menu-link">
          <router-link tag="a" class="menu__item" to="/">Главная</router-link>
          <router-link v-if="name===null" tag="a" class="menu__item" to="/sign-up">Регистрация</router-link>
          <router-link v-if="name===null" tag="a" class="menu__item" to="/sign-in">Авторизация</router-link>
          <router-link v-if="name!==null" tag="a" class="menu__item" to="/create">Создать пост</router-link>
          </div>
          <div v-if="name!==null" class="dropdown">
            <div class="dropbtn menu__user-name">{{ name }}</div>
            <div  @click="logOut()" class="dropdown-content ">
              <div class="menu__item">выход</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Cookies from 'js-cookie'
export default {
  name: 'mainHeader',
  computed: {
    ...mapGetters([
      'role',
      'name'
    ])
  },
  data() {
    return {
      date: []
    }
  },
  methods: {
    async logOut() {
      Cookies.set('logged_in', '');
      this.$store.dispatch('ExitUser');
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  padding: 1rem 0;
  background: white;
  border-bottom: 1px solid #E3E3E3;
  margin-bottom: 50px;
  &__menu{
    display: flex;
    justify-content: space-between;
  }
}
.menu{
  &__item{
    padding-right: .5rem;
    padding-left: .5rem;
    color: rgba(0,0,0,.5);
    text-decoration: none;
  }
  &__user-name{
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
  }
}
.dropdown {
  position: relative;
  display: inline-block;
  &-content {
    display: none;
    position: absolute;
    z-index: 1;
    border: 1px solid #E3E3E3;
    background-color: white;
    border-radius:2px;
    position: absolute;
    left: 50%;
    margin-right: -50%;
    padding: 10px 5px;
    transform: translate(-50%, 0%);
    cursor: pointer;
  }
  &:hover .dropdown-content {
    display: block;
  }
}
</style>