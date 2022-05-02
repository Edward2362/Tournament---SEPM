<template>
  <div class="sign-in">
    <form class="form" action="" method="POST">
      <div class="form-name"><h1>Sign in</h1></div>
      <div class="form-input">
        <div class="form-input-body">
          <div class="input-icon">
            <svg
              width="23"
              height="17"
              viewBox="0 0 23 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0329 17H3.64176C1.63356 17 0 15.3664 0 13.3582V3.64176C0 1.63382 1.63382 0 3.64176 0H19.0329C21.0408 0 22.6744 1.63382 22.6744 3.64176V13.3582C22.6744 15.3664 21.0408 17 19.0329 17ZM3.64176 1.06494C2.22083 1.06494 1.06494 2.22083 1.06494 3.64176V13.3582C1.06494 14.7792 2.22083 15.9353 3.64176 15.9353H19.0329C20.4538 15.9353 21.6097 14.7792 21.6097 13.3582V3.64176C21.6097 2.22083 20.4538 1.06494 19.0329 1.06494H3.64176Z"
                fill="#959595"
              />
              <path
                d="M2.78255 3.69245C5.50448 6.34485 8.22642 8.997 10.9484 11.6494C11.4558 12.1437 12.2345 11.3667 11.7263 10.8714C9.0044 8.21927 6.28247 5.56687 3.56053 2.91472C3.05313 2.42017 2.27439 3.19739 2.78255 3.69245Z"
                fill="#959595"
              />
              <path
                d="M11.7265 11.6494C14.4484 8.99722 17.1703 6.34482 19.8923 3.69267C20.4002 3.19761 19.6219 2.42013 19.1143 2.91469C16.3924 5.56684 13.6704 8.21924 10.9485 10.8714C10.4406 11.3664 11.2188 12.1439 11.7265 11.6494Z"
                fill="#959595"
              />
              <path
                d="M19.8612 13.5268C18.05 11.809 16.2385 10.0916 14.4274 8.37387C13.9137 7.88688 13.1344 8.66335 13.6494 9.15186C15.4606 10.8696 17.272 12.587 19.0832 14.3047C19.5969 14.7917 20.3761 14.015 19.8612 13.5268Z"
                fill="#959595"
              />
              <path
                d="M3.64018 14.3046C5.45136 12.5869 7.2628 10.8694 9.07398 9.15168C9.58869 8.66343 8.80995 7.88645 8.29599 8.3737C6.48481 10.0914 4.67338 11.8089 2.8622 13.5266C2.34749 14.0148 3.12623 14.7921 3.64018 14.3046Z"
                fill="#959595"
              />
            </svg>
          </div>
          <input
            type="text"
            class="icon"
            value
            placeholder="Email"
            v-model="email"
          />
        </div>
      </div>
      <div class="form-input">
        <div class="form-input-body">
          <div class="input-icon">
            <svg
              width="14"
              height="17"
              viewBox="0 0 14 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.394461 7.64316H1.61644V7.49653V5.06266C1.61644 3.67072 2.18617 2.40509 3.1029 1.48809V1.48687C4.02004 0.569731 5.28594 0 6.67883 0C8.07062 0 9.33625 0.569731 10.2534 1.48687L10.2548 1.48809C11.1715 2.40509 11.7412 3.67072 11.7412 5.06266V7.49653V7.64316H12.7145C12.9314 7.64316 13.109 7.82074 13.109 8.03748V16.3662C13.109 16.5829 12.9314 16.7605 12.7145 16.7605H0.394461C0.177589 16.7605 0 16.5829 0 16.3662V8.03748C0 7.82074 0.177589 7.64316 0.394461 7.64316ZM3.58329 7.64316H9.77395V7.49653V5.03456C9.77395 4.18344 9.42559 3.40911 8.86527 2.84811L8.86459 2.84866C8.30386 2.28752 7.52967 1.93902 6.67883 1.93902C5.82757 1.93902 5.05338 2.28738 4.49197 2.84811C3.93151 3.40911 3.58329 4.18344 3.58329 5.03456V7.49666V7.64316ZM6.70379 12.2005L7.32862 15.0838L5.61588 15.091L6.11851 12.169C5.65053 12.0189 5.31131 11.5804 5.31131 11.0626C5.31131 10.4214 5.83098 9.90176 6.47246 9.90176C7.11325 9.90176 7.63333 10.4214 7.63333 11.0626C7.63333 11.6246 7.23396 12.0934 6.70379 12.2005Z"
                fill="#959595"
              />
            </svg>
          </div>
          <input
            type="password"
            class="icon"
            value
            placeholder="Password"
            v-model="password"
          />
        </div>
      </div>
      <div class="form-input">
        <div class="notification" :class="{ 'active-pop-up': error }">
          Email or password is incorrect!
        </div>
      </div>
      <div class="form-submit" @click="signIn">
        <input type="submit" class="submit_button" form="login" value="Login" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      password: "",
      email: "",
      error: false,
    };
  },
  methods: {
    async signIn(e) {
      e.preventDefault();
      console.log("đã run");
      axios
        .post("api/v1/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$router.push({ name: "workspace" });
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        });
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/authentication.css";
</style>
