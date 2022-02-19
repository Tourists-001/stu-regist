<template>
  <div class="content-item active">
    <StuTable />
    <TurnPage :totalPage="totalPage" :nowPage="nowPage" @changePage="changePage"/>
    <ShowModel v-show="$store.state.isShow"/>
  </div>
</template>

<script>
import StuTable from "@/components/stuTable.vue";
import TurnPage from "@/components/turnPage.vue";
import ShowModel from "@/components/showModel.vue";
import { mapActions, mapState } from 'vuex';
export default {
  components: {
    StuTable,
    TurnPage,
    ShowModel,
  },
  computed: {
      ...mapState({
          totalPage: (state) => state.totalPage,
          nowPage: (state) => state.nowPage,
      })
  },
  methods: {
      ...mapActions(['getStuList']),
      changePage(p) {
          this.getStuList(p)
      },
  }
};
</script>

<style>
</style>