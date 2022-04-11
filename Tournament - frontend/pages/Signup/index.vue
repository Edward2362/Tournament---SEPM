<template>
    <div class="login_container">
        <div class = "box logobox" style = "vertical-align:bottom; border-right: 2px black solid; margin: 5rem 0;">
            <div class = "Logo_container">
                <img src = "../../store/logo.png" alt ="Tournament logo" class = "Logo">
                <img src = "../../store/ournament.png" alt ="Tournament logo" class = "ournament">
            </div>
            <div class = "introduction">
                <p>With contributions come rewards</p>
                <p>With sloth comes punishments</p>
            </div>
        </div>
        <div class = "box">
            <div class = "Signup">
                <p>Sign up</p>
            </div>
            <div class = "login_form">
                <form class = "form" id = "Signup">
                    <Input class_name="icon" form_id="Signup" id="email" placeholder_name="Email" type_name="text" image_link="url('../../store/email.png') no-repeat left"/>
                    <div>
                        <input type="text" class="icon" value placeholder="Password" id = "password">
                    </div>                    
                    <div>
                        <input type="text" class="icon" value placeholder="Retype Password" id = "retypepassword">
                    </div>                    
                    <div>
                        <input type="text" class="icon" value placeholder="Username" id = "username">
                    </div>
                    <div>
                        <input type = "submit" class = "submit_button" placeholder="Submit">
                    </div>
                </form>
            </div>
            <div style = "text-align: start">
                <button class = "button">
                    <p>
                        Login
                    </p>
                    <img src = "../../store/arrow.png" alt = "back to login arrow">
                </button>
            </div>
            <div class = "link_to_register">

            </div>
        </div>
    </div>
</template>
<script>
import Input from './../../components/Input.vue'

export default {
    name :'Signup',
    components: {
    Input,
    },
    data(){
        return{
            new_account: []
        }
    },
    methods:
    {
        async Signup(new_account){
            if(new_account["password"] == new_account["retypepassword"]){

            }
        }
    }
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
.Signup{
    font-weight: 700;
    font-size: 32px;
    text-align: center;
    padding-top: 2rem;
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
      background: url('../../store/email.png') no-repeat left;

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
    margin-left: 3rem;
}
.login_form{

}
.form{
    text-align: center;
    align-items: center;
}
</style>