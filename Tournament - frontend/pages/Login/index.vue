<template>
    <div class="login_container">
        <div class = "box logobox" style = "vertical-align:bottom; border-right: 2px black solid; margin: 5rem 0;">
            <div class = "Logo_container">
                <img src = "../../static/logo.png" alt ="Tournament logo" class = "Logo">
                <img src = "../../static/ournament.png" alt ="Tournament logo" class = "ournament">
            </div>
            <div class = "introduction">
                <p>With contributions come rewards</p>
                <p>With sloth comes punishments</p>
            </div>
        </div>
        <div class = "box">
            <div class = "Signin">
                <p>Sign in</p>
            </div>
            <div class = "login_form">
                <form class = "form" id= "login" ref="loginform">
                    <div>
                        <input type="text" class="icon" value placeholder="Email" v-model="email" >
                    </div>
                    <div>
                        <input type="text" class="icon" value placeholder="Password" v-model="password">
                    </div>                    
                    <input type = "submit" class = "submit_button" form = "login" placeholder="Submit" v-on:click="Signin">
                    <div>
                        {{errormessage}}
                    </div>

                </form>
            </div>
            <div style = "text-align: end">
                <button class = "button">
                    <p>
                        Register
                    </p>
                    <img src = "../../static/Signup_arrow.png" alt = "Go to register arrow">
                </button>
            </div>
            <div class = "link_to_register">

            </div>
        </div>
    </div>
</template>
<script>
import Input from './../../components/Input.vue'
import axios from 'axios'
export default {
    name :'Login',
    components: {
    Input,
    },
    data(){
        return{
            password: "",
            email: "",
            errormessage: ""
        }
    },
    methods:
    {
        async Signin(e){
            e.preventDefault();
            console.log("đã run")
            axios.post('v1/auth/login', {
            email: this.email,
            password: this.password,
            },                
            )
            .then(function (response) {
                console.log(response);
                window.location.replace("Workspace") 
            })
            .catch((error)=> {
                console.log(error);
                this.errormessage = error.response.data.message
        
            });     

            this.$refs.loginform.reset();
        },
    },

}

</script>
<style>
.login_container{
    display: grid;
    grid-template-columns: 50% 50%;
    margin: 5rem 12rem;
    height: 600px;
    padding: 1rem 2rem;
    background: #fff;
    align-self: center;
}
.box{
    text-align: center;
    align-items: center;
}   
.logo_box{
    display: grid;
    border-right: 1px solid black;
}
.Logo{
    width: 81.67px;
    height: 75.39px;
    align-self: flex-end;
    margin-left: 20%
}
.ournament{
    left: 26.16%;
right: 56.19%;
    align-self: flex-end;
}
.Signin{
    font-weight: 700;
    font-size: 32px;
    text-align: center;
    padding-top: 8rem;
    padding-bottom: 40px;
}
.Logo_container{
    height: 50%;
    display: flex;
    flex-direction: row;
    width: 100%;
}
.introduction{
height: 50%;
padding-top: 2rem;
font-size: 20px;
font-weight: 400;
text-align: center;
}
.icon {
  background: url('../../static/password.png') no-repeat left;
background-position: 10%;
  background-size: 20px;
  margin-bottom: 1rem;
  border-radius: 50px;
  padding: 10px 10px 10px 80px;
}
.submit_button{
    padding-top: 4rem;
    border-radius: 50px;
    padding: 20px;
background: #FF5C72;
min-width: 60%;
margin-top: 3rem;
}
.button{
    background-color: transparent;
    border: none;
    margin-top: 2rem;
    margin-right: 3rem;
}
.login_form{

}
.form{
    text-align: center;
    align-items: center;
}
</style>