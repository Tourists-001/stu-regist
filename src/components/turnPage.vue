<template>
  <div class="page-controller-container">
    <div
      id="previous"
      class="previous-btn icon iconfont icon-jiantou1"
      @click="turnPage('prev')"
    >
      &lt;
    </div>
    <div id="paginationContainer" class="page-item-wrapper">
      <template v-if="totalPage <= 7">
        <div
          class="page-item"
          v-for="i in totalPage"
          :key="i"
          :class="{ active: i == nowPage }"
          @click="turnPage(i)"
        >
          {{ i }}
        </div>
      </template>
      <template v-else>
        <template v-if="nowPage <= 4">
          <div
            class="page-item"
            v-for="i in 6"
            :key="i"
            @click="turnPage(i)"
            :class="{ active: i == nowPage }"
          >
            {{ i }}
          </div>
        </template>
        <template v-if="nowPage > 4">
          <div class="page-item" @click="turnPage(1)">1</div>
          <div
            class="page-item"
            @click="turnPage(nowPage - 5 > 1 ? nowPage - 5 : 1)"
          >
            ...
          </div>
        </template>
        <template v-if="nowPage > 4 && nowPage < totalPage - 3">
          <!-- n-2, n-1, n, n+1, n+2 -->
          <!-- n-3+1, n-3+2, n-3+3, n-3+4, n-3+5 -->
          <div
            class="page-item"
            v-for="i in 5"
            :key="nowPage - 3 + i"
            :class="{ active: i == 3 }"
            @click="turnPage(nowPage - 3 + i)"
          >
            {{ nowPage - 3 + i }}
          </div>
        </template>
        <template v-if="nowPage < totalPage - 3">
          <div
            class="page-item"
            @click="
              turnPage(nowPage + 5 >= totalPage ? totalPage : nowPage + 5)
            "
          >
            ...
          </div>
          <div class="page-item" @click="turnPage(totalPage)">
            {{ totalPage }}
          </div>
        </template>
        <template v-if="nowPage >= totalPage - 3">
          <div
            class="page-item"
            v-for="i in 6"
            :key="totalPage - 6 + i"
            @click="turnPage(totalPage - 6 + i)"
            :class="{ active: totalPage - 6 + i == nowPage }"
          >
            {{ totalPage - 6 + i }}
          </div>
          <!-- 95, 96, 97, 98, 99, 100 -->
          <!-- t-6+1, t-6+2，   t-6+6 -->
          <!-- i totalPage -->
        </template>
      </template>
    </div>
    <div
      id="next"
      class="next-btn icon iconfont icon-jiantou"
      @click="turnPage('next')"
    >
      &gt;
    </div>
  </div>
</template>

<script>
export default {
  props: ["totalPage", "nowPage"],
  methods: {
    turnPage(val) {
      // 根据传入的数据，计算新的数据
      var p = this.nowPage;
      if (val == "prev") {
        if (this.nowPage > 1) {
          // this.nowPage--;
          p = this.nowPage - 1;
        }
      } else if (val == "next") {
        if (this.nowPage < this.totalPage) {
          // this.nowPage++;
          p = this.nowPage + 1;
        }
      } else {
        // this.nowPage = val;
        p = val;
      }
      // 防止 1=》1
      if(p == this.nowPage) {
        return;
      }
      // 数据回传
      this.$emit('changePage', p)
    },
  },
};
</script>

<style>
</style>