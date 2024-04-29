<template>
<div>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 my-3 text-success fw-bold">Ajouter employé</p>
        <p>Ajouter un nouveau employé à votre équipe!</p>
      </div>
    </div>
  </div>

  <div class="container mt-3">
    <p v-bind:style="{ fontSize: fontSize + 'px' }" class="h3 text-success fw-bold">Gestion de mon équipe</p>
      <router-link to="/employees/add" class="btn btn-warning btn-sm fw-bold"><i class="fa fa-plus" aria-hidden="true"></i> Ajouter</router-link>
    <router-link :to="`/employees/view/${employee.id}`" class=" btn  btn-success me-1 ">
      <i class="fa fa-eye"></i>
    </router-link>
    <router-link :to="`/employees/edit/${employee.id}`" class=" btn btn-warning me-1 ">
      <i class="fa fa-pen"></i>
    </router-link>
    <div class="row">
      <div class=" col-md-4">
        <form  @submit.prevent="submitCreate()">
        <div class=" mb-3">
        <input required v-model="employee.name" type="text" class="form-control" placeholder="Nom">
        </div>
        <div class="mb-3">
        <input  required v-model="employee.photo" type="text" class="form-control" placeholder="Image">
        </div>
        <div class="mb-3">
        <input required v-model="employee.mail" type="Email" class="form-control" placeholder="Adresse Mail">
        </div>
        <div class="mb-3">
        <input required v-model="employee.title" type="text" class="form-control" placeholder="Intitulé du poste">
        </div>
        <div class="mb-3">
        <input required v-model="employee.gestionnaire" type="text" class="form-control" placeholder="Gestionnaire">
        </div>

         <div class="mb-3">
        <select  required v-model="employee.equipe" class="form-control" v-if="groups.length >0">
          <option value="">Choisir Equipe</option>
          <option :value="group.name"  v-for="group of groups" :key ="group.id">{{group.name}}</option>

        </select>
        </div>
        <div class="mb-3">
        <input type="submit" class="btn btn-primary" value="Ajouter">
        </div>
        </form>
      </div>
      <div class="col-md-4">
       <img :src="employee.photo" alt="" class="employee-img">
      </div>
    </div>
  </div>
  </div>


</template>
<script>
import { ConductorService } from '@/services/ConductorService'

export default {
  name: "AddEmployee",
  //create a state
  data: function(){
    return {
      employee: {
        name: '',
        photo: '',
        mail:'',
        groupId: '',
        equipe:'',
        title: '',
        gestionnaire: '',

      },
      groups: []

    }
  },
  created: async function () {
    try {
      let response = await ConductorService.getAllGroups();
      this.groups= response.data;
    } catch (error) {
      console.log(error);
    }

  },

  methods: {
    submitCreate: async function(){
      try {
        let response= await ConductorService.createEmployee(this.employee);
        console.log('hello', response);
        if(response){

          return this.$router.push('/');

        }
      } catch (error) {
        console.log(error);
      }

    }
  },
}
</script>
<style scoped>

</style>
