<template>
  <div>
    <div style="color: blue; overflow-y:scroll; height:100px">
      子组件4获取的vuex值:
      <br>
      data: {{ data }}
      <br>
      name: {{ name }}
      <br>
      sex: {{ sex }}
      <br>
      info: {{ info }}
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  const {mapGetters} = createNamespacedHelpers('demo')

  export default {
    name: 'Children4Demo',
    computed: {
      // 批量注册getters
      ...mapGetters([
        'data',
        'name',
        'sex',
        'info'
      ])
    }
  }
</script>
