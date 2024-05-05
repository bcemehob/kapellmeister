<template>
  <div class="section">
    <div class="title">Pattern editor</div>
    <div>
      <button class="btn btn-dark" @click="save()"><i class="fa fa-save"></i></button>



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
  name: "PatternEditor",
  data: function () {
    return {
      name: '',
      errorMessage: null,
      groups: []
    }
  },

  methods: {
    save: function () {
      const link = document.createElement("a");
      const content = "file content";
      const file = new Blob([content], { type: 'application/json' });
      link.href = URL.createObjectURL(file);
      link.download = "pattern.json";
      link.click();
      URL.revokeObjectURL(link.href);
    },
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
