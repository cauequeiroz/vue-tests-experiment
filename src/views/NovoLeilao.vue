<template>
  <div class="container">
    <h4>Novo leilão</h4>
    <form @submit.prevent="criar">
      <div class="form-group">
        <label for="produto">Objeto do leilão</label>
        <input v-model="leilao.produto" type="text" id="produto" class="form-control produto" required>
      </div>
      <div class="form-group">
        <label for="descricao">Descrição</label>
        <textarea v-model="leilao.descricao" id="descricao" class="form-control descricao" required></textarea>
      </div>
      <div class="form-group">
        <label for="valor">Lance inicial</label>
        <input v-model="leilao.lanceInicial" type="number" id="valor" step="1" class="form-control valor" required>
      </div>
      <button type="submit" class="btn btn-lg btn-block btn-outline-primary">Criar</button>
    </form>
  </div>
</template>

<script>
import { createLeilao } from '@/http'

export default {
  data () {
    return {
      leilao: {}
    }
  },
  methods: {
    async criar () {
      await createLeilao(this.leilao)
      this.$router.push('/')
    }
  }
}
</script>
