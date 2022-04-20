<template>
  <header class="header">
    <!-- <div> -->
      <div class = "flex_container">
        <img src = "../static/logo.png" alt ="Tournament logo" class = "Logo">
        <img src = "../static/ournament.png" alt ="Tournament logo" class = "ournament">
      </div>
    <!-- </div> -->
    <div class = "flex_container">
      <div class = "function">
        <p>
          Recent
        </p>
      </div>
      <div class = "function">
        <p>
          Create
        </p>
      </div>
    </div>
    <div>

    </div>
    <div>
      <div>
        <input type="text" class="icon" value placeholder="Search" id = "search">
      </div>
    </div>
    <div class = "avatar_container">
      <div class = "avatar">

      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader"
};
</script>

<style>
.header{
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
}
.Logo{
    width: 43.31px;
    height: 40px;
    align-self: flex-end;
    margin-left: 5%;
}
.ournament{
    width: 128px;
    height: 17px;
    /* left: 26.16%;
    right: 56.19%; */
    align-self: flex-end;
}
.flex_container{
    display: flex;
    flex-direction: row;
    width: 100%;
}
.function{
  width: 50%;
  font-family: Ubuntu;
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #234C87;
}
.icon {
      background: url('../static/search.png') no-repeat left;
    background-position: 10%;
  background-size: 20px;
  margin-bottom: 1rem;
  border-radius: 50px;
  padding: 10px 10px 10px 80px;
}
.avatar_container{
  display: flex;
  justify-content: flex-end;
}
.avatar{
  width: 48px;
  height: 48px;
  margin-right: 1rem;
  background: #234C87;
  border-radius: 50%;
}
</style>
