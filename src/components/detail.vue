<template>
  <div class="container">
    <h1 class="post-detail__header">{{ date.smallText }}</h1>
    <div class="post-detail__text">
      {{ date.largeText }}
    </div>
    <div class="post-detail__bottom">
      <div class="post-detail__autor">
        Автор: {{  autor }}
      </div>
      <div class="post-detail__time">
        <span v-if="date.createdAt==null">{{ date.updatedAt }}</span>
        <span v-else>{{ date.updatedAt }}</span>
      </div>
    </div>
    <Modal v-if="role=='writer'"  @confirm="removePost()">
      <template v-slot:modal-action>
        удалить
      </template>
    </Modal>
    <router-link v-if="idUser==date.userId || role=='writer'" tag="div" class="b-button" :to="{name: 'edit', params: {id:date.id}}">Редактировать</router-link>
  </div>
</template>

<script>
import axios from 'axios';

const baseURL = "http://localhost:3000/post"
const baseUser = "http://localhost:3000/users";

import {mapGetters} from 'vuex'
import Modal from '@/components/modal'

export default {
  name: 'detail',
  props: ['id'],
  components: {
    Modal
  },
  computed: {
    ...mapGetters([
      'role',
      'idUser'
    ])
  },
  data() {
    return {
      date: [],
      autor: ''
    }
  },
  async created() {
    try {
      const res = await axios.get(baseURL + '/' + this.id)
      this.date = res.data;
      let dataAutor = await axios.get(baseUser + "/" + res.data.userId);
      this.autor = dataAutor.data.firstName + ' ' + dataAutor.data.lastName;
    } catch (e) {
      window.location.href = '/404';
      console.error(e)
    }
  },
  methods: {
    async removePost() {
      try {
        await axios.delete(baseURL + "/" + this.id);
        window.location.href = '/';
      } catch (e) {
        console.error(e)
        window.location.href = '/404';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post-detail {
  &__text {
    margin-bottom: 20px;
  }
  &__autor {
    margin-bottom: 20px;
  }
  &__bottom{
    display: flex;
    justify-content: space-between;
  }
}
</style>