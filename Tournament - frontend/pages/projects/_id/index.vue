<template>
  <div class="project-content">
    <h2 class="section-head">Ranking</h2>
    <div class="section-body">
      <div class="ranking">
        <div class="rank-position">
          <div class="rank" id="rank-2">
            <div class="rank-owner">
              <div class="owner-name">{{ top3[1].username }}</div>
              <div class="owner-point">{{ top3[1].OverallPoint }}</div>
            </div>
            <div class="rank-title">2</div>
          </div>
        </div>
        <div class="rank-position">
          <div class="rank" id="rank-1">
            <div class="rank-owner">
              <div class="owner-name">{{ top3[0].username }}</div>
              <div class="owner-point">{{ top3[0].overallPoint }}</div>
            </div>
            <div class="rank-title">1</div>
          </div>
        </div>
        <div class="rank-position">
          <div class="rank" id="rank-3">
            <div class="rank-owner">
              <div class="owner-name">{{ top3[2].username }}</div>
              <div class="owner-point">{{ top3[2].overallPoint}}</div>
            </div>
            <div class="rank-title">3</div>
          </div>
          {{getCurrentProject}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  layout: "project",
  data() {
    return {
      weekOnProcess: true,
      tasks: [],
      currentmember: {},
      project: {},
      allmembers: [],
      top3: [
        { id: 1, name: "Quang", point: 400 },
        { id: 2, name: "Tuan", point: 200 },
        { id: 3, name: "Minh", point: 100 },
      ],
      listTop3:[]
    };
  },
  computed: {
    ...mapGetters({
      getUserToken: "user/getUserToken",
      getUserTrelloId: "user/getUserTrelloId",
      getMemberWithProjectId: "projects/getMemberWithProjectId",
      getUserId: "user/getUserId",
      getTasks: "tasks/getTasks",
      getCurrentProject: "project/getCurrentProject",
    }),
    top3maybe(){
      this.getCurrentProject.members.s
      // if(!!this.listTop3  &&  this.listTop3.length >0){
      //   // this.listTop3.sort(function (a, b) {
      //   //   return b.overallPoint - a.overallPoint;
      //   // });
        
      //   return listTop3
      //   }
    }
  },
  methods: {
    ...mapActions({
      fetchTasksByProject: "tasks/fetchTasksByProject",
    }),
    async setUpIndexPage() {
      // await axios
      //   .get(
      //     "https://api.trello.com/1/members/" +
      //       this.getUserTrelloId +
      //       "?key=9a7391de8e0ad4c00e667a2e2eaa9c66&token=" +
      //       this.getUserToken
      //   )
      //   .then((response) => {
      //     this.currentmember = response.data;
      //   });
      // .map(m => new Object({name: o.name, id: o.id}))
      this.allmembers = this.getCurrentProject.members;
      console.log(typeof this.getCurrentProject.members)
      console.log(this.allmembers)
      var member = {}
      
        // for(let i =0; i < 3; i++){
        //   console.log(this.allmembers)
          // axios.get("/api/v1/users/" + this.allmembers[i].user).then(response => {
          //   member.username = response.data.data.username
          // })
        //   member.overallPoint = this.allmembers[i].overallPoint
        //   this.listTop3.push(member)
        // }
      console.log("hey",this.listTop3)

      

    },
    // compare( a, b ) {
    //   if ( a.overallPoint < b.overallPoint ){
    //     return -1;
    //   }
    //   if ( a.overallPoint > b.overallPoint ){
    //     return 1;
    //   }
    //   return 0;
    //   },
  },
  async created() {
    this.setUpIndexPage();
  },
};
</script>

<style>
@import "../../../assets/styles/dashboard.css";
</style>
