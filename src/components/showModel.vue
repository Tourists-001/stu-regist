<template>
  <div id="dialogContainer" class="dialog-container" @click="setShow(false)">
    <div class="dialog-main" @click.stop="() => {}">
      <form id="updateForm" class="user-form">
        <div class="item form-item">
          <label for="name ">姓名：</label>
          <input
            type="text"
            id="name"
            :value="activeStu.name"
            @input="edit('name', $event.target.value)"
          />
        </div>
        <div class="item form-item">
          <label for="sNo">学号：</label>
          <input type="text" id="sNo" readonly="" :value="activeStu.sNo" />
        </div>
        <div class="item form-item">
          <label for="sex">性别：</label>
          <select id="sex" :value="activeStu.sex" @change="edit('sex', $event.target.value)">
            <option value="0">男</option>
            <option value="1">女</option>
          </select>
        </div>
        <div class="item form-item">
          <label for="birth">生日：</label>
          <input type="text" id="birth" :value="activeStu.birth" @input="edit('birth', $event.target.value)" />
        </div>
        <div class="item form-item">
          <label for="phone">电话：</label>
          <input type="text" id="phone" :value="activeStu.phone" @input="edit('phone', $event.target.value)" />
        </div>
        <div class="item form-item">
          <label for="address">地址：</label>
          <input type="text" id="address" :value="activeStu.address" @input="edit('address', $event.target.value)" />
        </div>
        <div class="item form-item">
          <label for="email">邮件：</label>
          <input type="text" id="email" :value="activeStu.email" @input="edit('email', $event.target.value)" />
        </div>
        <div class="btns">
          <div class="add-btn" id="updateBtn" @click="update">修改</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            stu:{}, //记录修该的内容
        }
    },
    computed: {
        ...mapState({
            activeStu:(state) => state.activeStu,
        })
    },
    methods: {
        ...mapMutations(['setShow']),
        async update() {
            // 对象的合并
            let user = Object.assign({}, this.activeStu, this.stu);
            const val = await this.$api.updateStu(user);
            if (val.status == 'success') {
                alert(val.msg);
                this.setShow(false);
                Object.assign(this.activeStu, user)
            }
        },
        edit(key, value) {
            this.stu[key] = value
        },
    }

}
</script>

<style>

</style>