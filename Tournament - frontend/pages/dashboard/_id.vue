<template>
    <div class = "content">
        <div>
          <p>left side</p>
        </div>
        <div class = "main">
          <div>
              <h1>
                  SEPM
              </h1>
              <div class = "Dashboard">
                <div>
                    <p>Ranking</p>
                    <ul>
                        <li>
                            Hello
                        </li>
                        <li>
                            Second
                        </li>
                    </ul>
                </div>
                <div>
                    <div>
                        first second part
                    </div>
                    <div>
                        second second part
                    </div>
                </div>
                
              </div>
          </div>
        </div>
    </div>
</template>
<script>
import AppHeader from "../../components/AppHeader";
  import axios from 'axios'

export default {
  name :'Dashboard',
  components: {
    AppHeader,
    data(){
        return{
            password: "",
            email: "",
            errormessage: ""
        }
    },
    methods:
    {
      get(name){
        var url = window.location.search;
        var num = url.search(name);
        var namel = name.length;
        var frontlength = namel+num+1; //length of everything before the value 
        var front = url.substring(0, frontlength);  
        url = url.replace(front, "");  
        num = url.search("&");
        if(num>=0) return url.substr(0,num); 
        if(num<0)  return url;      
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
    },
  }
}
}
</script>
<style>
.content{
  display: grid;
  grid-template-columns: 20% 80%;
}
.Dashboard{
    border: 1px solid black;
    display: grid;
    grid-template-columns: 80% 20%;
}
.class{

}
</style>