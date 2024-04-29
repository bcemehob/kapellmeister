<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <p class="h3 my-3 text-success fw-bold">Pattern editor</p>
          <p>Edit pattern of composition</p>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class=" col-md-4">
          <form @submit.prevent="editSubmit()">
            <div class=" mb-3">
              <input required v-model="name" type="text" class="form-control" placeholder="Name">
            </div>
            <div class="mb-3">
              <select required v-model="groups" class="form-control">
                <option value="">Name</option>
                <option :value="name" v-for="group of groups" :key="group.id">{{ group.name }}</option>

              </select>
            </div>
            <div class="mb-3">
              <input type="submit" class="btn btn-danger" value="Submit">
            </div>
          </form>
        </div>
      </div>


    </div>
  </div>

</template>
<script>
import {ConductorService} from '@/services/ConductorService'

export default {
  name: "EditEmployee",
  data: function () {
    return {
      name: '',
      errorMessage: null,
      groups: []
    }
  },
  created: async function () {
    try {
      let response = await ConductorService.getEmployee(this.employeeId);
      this.employee = response.data;
      let groupResponse = await ConductorService.getAllGroups();
      this.groups = groupResponse.data;

    } catch (error) {
      this.errorMessage = error;


    }

  },

  methods: {
    editSubmit: async function () {
      try {
        let response = await ConductorService.updateEmployee(this.employee, this.employeeId);
        if (response) {

          return this.$router.push('/');

        }
      } catch (error) {
        console.log(error);
      }

    }
  }

}
</script>
<style>

</style>
