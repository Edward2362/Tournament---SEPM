<template>
    <div class = "content">
        <div>
          
        </div>
        <div class = "main">
          <div>
          </div>
          <div>
            <div>
              <h2>Recent</h2>
            </div>
            <div class = "grid_container">
              <div v-for="(board, index) in recent" :key="board.name">
                {{board.finished}} + {{index}}
              </div>
              <div>
                <p>
                  Hello
                </p>
              </div>
              <div>
                <p>
                  Hello
                </p>
              </div>
              <div>
                <p>
                  Hello
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>

        </div>
    </div>
</template>
<script>
import AppHeader from "../../components/AppHeader";
import axios from "axios"
export default {
  components: {
    AppHeader
  },
  data(){
    return{
      password: "",
      retypepassword: "",
      project_name: 0,
      info: null,
      recent: null,
      done: [],
      ongoing: [],
    }
  },
  methods:
    {
        // async Getboard(){
        //     const boards = axios.get('users/me/projects?limit=99')
        //     .then(function (response) {
        //       console.log(response);
        //     })
        //     .catch((error)=> {
        //       console.log(error);
        //       this.errormessage = error.response.data.message                
        //       }
        //     );
        //   console.log(boards.data)
        // },
        // async createboard(){
          
        // }
    },

  mounted () {
      axios
        .get('v1/users/me/projects?sort=updatedAt&limit=4')
        .then(response => {
          console.log(response.data);
          this.recent = response.data.data
        })
        console.log(this.recent)
        console.log(this.done)
        axios.get('v1/users/me/projects')
        .then(response => {
          console.log(response.data);
          for(let i = 0; i < response.data.data.length; i++){
            if(response.data.data[i].finished == false){
              this.ongoing.push(response.data.data[i])
            }
            else{
              this.done.push(response.data.data[i])
            }
          }
        })

      
    }
};
</script>
<style>
.content{
  display: grid;
  grid-template-columns: 20% 60% 20%;
}
.grid_container{
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  border: 1px black solid
}
</style>