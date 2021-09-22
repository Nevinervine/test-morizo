<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>
<script>
import axios from 'axios';
import Cookies from 'js-cookie'
import Header from '@/components/header'
const baseURL = "http://localhost:3000/users"
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    ...mapGetters([
      'log_in',
    ])
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        if(Cookies.get('logged_in')!='') {
          if(!this.log_in) {
            const res = await axios.get(baseURL + '/' + Cookies.get('logged_in'));
            this.$store.dispatch('SetUserInfo', res);
          }
        }
      }catch (err) {
        console.log(err);

      }
    }
  }
}
</script>
<style lang="scss">
.b-button{
  margin-bottom: 20px;
  cursor: pointer;
  border: 1px solid #E3E3E3;
  background-color: white;
  border-radius: 2px;
  padding: 5px 20px;
  margin-right: 10px;
  transition: all 0.3s;
  max-width: max-content;
  &:hover{
    background-color: #E3E3E3;
  }
}
.b-input{
  height: 30px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #D0D0D0;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 20px;
}
.b-textarea{
  min-height: 250px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #D0D0D0;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 20px;
}
.b-select{
  margin: 0 20px;
}
</style>
