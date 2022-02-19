<template>
  <div id="dialogContainer" class="dialog-container">
    <div class="dialog-main">
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
          <input type="text" id="sNo"  :value="activeStu.sNo" @input="edit('sNo', $event.target.value)" />
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
          <div class="add-btn" id="updateBtn" @click="update">添加</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
    data() {
        return {
            activeStu:{
                name: '',
                sNo: '',
                sex: 1,
                birth: '',
                phone: '',
                address: '',
                email: '',
            }
        }
    },
    computed: {
        ...mapState({
            stuList: (state) => state.stuList
        })
    },
   methods: {
       ...mapMutations(['setStuList']),
       async update() {
            for (const item in this.activeStu) {
                if (this.activeStu[item] === '') {
                    alert("请输入")
                    return;
                }
            }
            const value = await this.$api.addStu(this.activeStu);
            if (value.status === 'fail') {
                alert(value.msg)
            } else {
                alert(value.msg)
                this.setStuList(this.activeStu);
                this.$router.push('/main/stulist')
            }
        },
        edit(item,list) {
            this.activeStu[item] = list;
        }
   }

}
</script>

<style scoped>
.dialog-container {
    display: block;
    width: 500px;
    height: 500px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

</style>