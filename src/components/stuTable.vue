<template>
  <table class="table-container">
    <thead>
      <tr>
        <th>学号</th>
        <th>姓名</th>
        <th>性别</th>
        <th>年龄</th>
        <th>电话</th>
        <th>邮箱</th>
        <th>地址</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody id="tableContainer">
      <tr v-for="stu in stuList" :key="stu.sNo">
        <td>{{ stu.sNo }}</td>
        <td>{{ stu.name }}</td>
        <td>{{ stu.sex == "0" ? "男" : "女" }}</td>
        <td>{{ new Date().getFullYear() - stu.birth }}</td>
        <td>{{ stu.phone }}</td>
        <td>{{ stu.email }}</td>
        <td>{{ stu.address }}</td>
        <td>
          <span class="edit" style="margin-right: 10px" @click="edit(stu)"
            >编辑</span
          >
          <span class="del" @click="del(stu.sNo)">删除</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    computed: {
        ...mapState({
            stuList: (state) => state.stuList,
        })
    },
    methods: {
        ...mapActions(['getStuList','delStu']),
        edit(stu) {
            this.$store.commit('setActiveStu',stu);
            this.$store.commit('setShow',true);
        },
        async del(sNo) {
            const flag = confirm('是否删除');
            if (flag) {
                this.delStu(sNo);
            } else {
                return;
            }
        },
    },
    created() {
        this.getStuList(1);
    }

}
</script>

<style>

</style>