<template>
  <b-container fluid class="admin-dashboard-w bv-example-row bv-example-row-flex-cols">
    <b-row  align-v="center"> 
      <b-col lg="10" md="12" sm="12"> 
        <b-card-group deck>
          <b-card no-body header="<b>Dash Board</b>">
            <b-card-body>
              No Data
            </b-card-body>
          </b-card>
        </b-card-group> 
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      isSignin: false,
    }
  },
  methods : {
  },
  mounted() {
  },
  watch: {
  }
}
</script>
<style lang="scss">
  .admin-dashboard-w {
    padding-top : 83px;
  }
</style>