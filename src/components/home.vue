<template>
  <div class="container">
    <h1>Посты</h1>
    <label>отображаемое количество постов</label>
    <select class="b-select" @change="changeLimit()" v-model="limit">
      <option :value="5">5</option>
      <option :value="10">10</option>
      <option :value="20">20</option>
    </select>
    <div class="post">
      <router-link v-for="todo of todos" :key="todo.id" tag="div" class="post__item" :to="{name: 'detail', params: {id:todo.id}}">{{ todo.smallText }}</router-link>
    </div>
    <div v-if="paggin!==1" class="pagination">
      <div class="pagination__item"  v-for="item in paggin"  :key="item.id" :class="{ 'pagination__item--active': item==page }" @click="flip(item)">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
const baseURL = "http://localhost:3000/post"

export default {
  name: 'home',
  props: ['id'],
  data() {
    return {
      todos: [],
      todoName: '',
      limit: 5,
      page: 1,
      rcountPost: 0,
      paggin: 0
    }
  },
  async created() {
    var paramsString = document.location.search;
    var searchParams = new URLSearchParams(paramsString);
    if (searchParams.get("page") !== null) {
      this.page = parseInt(searchParams.get("page"));
    }
    if (searchParams.get("limit") !== null) {
      this.limit = parseInt(searchParams.get("limit"));
    }
    try {
      const res = await axios.get(baseURL);
      this.countPost = res.data.length;
    } catch (e) {
      console.error(e)
    }
    this.getData();
    this.createPagination();
  },
  methods: {
    async getData() {
      try {
        const res = await axios.get(baseURL + "/?_page=" + this.page + "&_limit=" + this.limit);
        this.todos = res.data;
      } catch (e) {
        console.error(e)
      }
    },
    changeLimit() {
      this.page = 1;
      this.getData();
      this.createPagination();
      let baseUrl = window.location.href.split("?")[0];
      window.history.pushState('name', '', baseUrl + '?page=' + this.page + '&limit=' + this.limit);
    },
    createPagination() {
      this.paggin = (Math.ceil(this.countPost / this.limit));
    },
    flip(pag) {
      let baseUrl = window.location.href.split("?")[0];
      window.history.pushState('name', '', baseUrl + '?page=' + pag + '&limit=' + this.limit);
      this.page = pag;
      this.getData();
    }
  }
}
</script>

<style lang="scss">

.container {
  margin: 0 auto;
  max-width: calc(100% - 120px);
  width: 100%;
  @media screen and (max-width: 768px){
    max-width: calc(100% - 40px);
  }
  @media screen and (max-width: 575px){
    max-width: calc(100% - 10px);
  }
}
.post {
  &__item {
    padding: 18px 50px 18px 5px;
    border-bottom: 1px solid #E3E3E3;
    text-decoration: none;
    color: #222;
    transition: all 0.4s;
    cursor: pointer;

    &:hover {
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
h1 {
  color: #222;
  font-size: 40px;
  line-height: 48px;
  text-align: center;
  margin-bottom: 20px;
}
.pagination{
  margin: 40px 0;
  display: flex;
  overflow: scroll;
  &__item{
    margin: 0 7px;
    font-size: 16px;
    padding: 5px 15px;
    border: 1px solid #E3E3E3;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    line-height: 20px;
    &--active{
      color: #222;
      border-color: #222;
    }
  }
}

</style>