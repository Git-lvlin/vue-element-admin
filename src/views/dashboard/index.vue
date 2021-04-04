<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <!-- <tabelDashboard /> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
// import editorDashboard from './editor'
// import tabelDashboard from './tabel'// 导入tabel表格

export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard },
  // components: { tabelDashboard },
  data() {
    return {
      currentRole: 'tabel'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
