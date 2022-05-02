<template>
  <div class="sign-up">
    <form class="form" action="" method="POST">
      <div class="form-name"><h1>Sign up</h1></div>
      <div class="form-input">
        <div class="form-input-body" :class="{ invalid: !email.isValid }">
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
            v-model="email.value"
            @input="validateEmail"
          />
          <div class="tooltip">Require valid email</div>
        </div>
      </div>
      <div class="form-input">
        <div class="form-input-body" :class="{ invalid: !password.isValid }">
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
            v-model="password.value"
            @input="validatePass"
          />
          <div class="tooltip pass">
            Password must contain at least 8 characters with uppercase,
            lowercase, number and symbol
          </div>
        </div>
      </div>
      <div class="form-input">
        <div
          class="form-input-body"
          :class="{ invalid: !retypePassword.isValid }"
        >
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
            placeholder="Retype Password"
            v-model="retypePassword.value"
            @input="validateRePass"
          />
          <div class="tooltip retype">
            Retype password must the same with password
          </div>
        </div>
      </div>
      <div class="form-input">
        <div class="form-input-body" :class="{ invalid: username == '' }">
          <div class="input-icon">
            <svg
              width="24"
              height="17"
              viewBox="0 0 24 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.473 1.9584H15.2003V0.36396C15.2003 0.163058 15.0376 0.000284565 14.8367 0.000284565L9.16387 0C8.96297 0 8.80019 0.162773 8.80019 0.363675V1.95811L1.52727 1.9584C0.685214 1.9584 0 2.64363 0 3.48567V15.0963C0 15.9384 0.685229 16.6236 1.52727 16.6236H22.4727C23.3148 16.6236 24 15.9383 24 15.0963V3.48567C24 2.6434 23.3148 1.9584 22.4727 1.9584H22.473ZM9.52703 0.727402H14.4725V3.06366H9.52703V0.727402ZM23.2729 15.0968C23.2729 15.5379 22.914 15.8967 22.473 15.8967H1.52752C1.08644 15.8967 0.727641 15.5378 0.727641 15.0968V3.48618C0.727641 3.0451 1.08648 2.6863 1.52752 2.6863H8.80015V3.42819C8.80015 3.6291 8.96292 3.79187 9.16383 3.79187H14.8366C15.0375 3.79187 15.2003 3.6291 15.2003 3.42819V2.6863H22.4729C22.914 2.6863 23.2728 3.04514 23.2728 3.48618L23.2729 15.0968ZM7.13031 9.79991C8.67463 9.79991 9.93127 8.54327 9.93127 6.99895C9.93127 5.45463 8.67463 4.19799 7.13031 4.19799C5.58599 4.19799 4.32935 5.45463 4.32935 6.99895C4.32964 8.54327 5.58599 9.79991 7.13031 9.79991ZM7.13031 4.92531C8.27367 4.92531 9.20395 5.85559 9.20395 6.99895C9.20395 8.14231 8.27367 9.07258 7.13031 9.07258C5.98695 9.07258 5.05667 8.14231 5.05667 6.99895C5.05667 5.85559 5.98695 4.92531 7.13031 4.92531ZM8.13628 10.1237H6.12471C4.19109 10.1237 2.61799 11.4407 2.61799 13.0596C2.61799 13.5012 3.01524 13.8467 3.79865 14.0863C4.42754 14.2787 5.25366 14.3846 6.125 14.3846H8.13657C9.00762 14.3846 9.83402 14.2787 10.4629 14.0863C11.2463 13.8467 11.6436 13.5013 11.6436 13.0596C11.6433 11.4407 10.0699 10.1237 8.13628 10.1237ZM10.1226 13.4276C9.57649 13.5758 8.87103 13.6575 8.13628 13.6575H6.12471C5.38996 13.6575 4.68449 13.5758 4.13813 13.4276C3.57525 13.2747 3.37722 13.1037 3.34502 13.0468C3.34901 12.4782 3.6293 11.9381 4.13499 11.5244C4.66571 11.0902 5.37225 10.8511 6.12464 10.8511H8.13621C8.88859 10.8511 9.59515 11.0902 10.1258 11.5244C10.6315 11.9382 10.9118 12.4786 10.9158 13.0468C10.8834 13.1037 10.6856 13.2747 10.1224 13.4276H10.1226ZM21.2844 6.78441C21.2844 6.98531 21.1217 7.14808 20.9208 7.14808H14.009C13.8081 7.14808 13.6453 6.98531 13.6453 6.78441C13.6453 6.5835 13.8081 6.42073 14.009 6.42073H20.9208C21.1217 6.42073 21.2844 6.5835 21.2844 6.78441ZM20.6211 9.22797C20.6211 9.42887 20.4583 9.59165 20.2574 9.59165L14.6723 9.59136C14.4714 9.59136 14.3086 9.42859 14.3086 9.22768C14.3086 9.02678 14.4714 8.86401 14.6723 8.86401H20.2574C20.4583 8.8643 20.6211 9.02707 20.6211 9.22797ZM20.6211 11.7984C20.6211 11.9993 20.4583 12.1621 20.2574 12.1621L14.6723 12.1618C14.4714 12.1618 14.3086 11.9991 14.3086 11.7982C14.3086 11.5972 14.4714 11.4345 14.6723 11.4345H20.2574C20.4583 11.4348 20.6211 11.5975 20.6211 11.7984Z"
                fill="#959595"
              />
            </svg>
          </div>
          <input
            type="text"
            class="icon"
            value
            placeholder="Username"
            v-model="username"
          />
          <div class="tooltip">Require username</div>
        </div>
      </div>
      <div class="form-input">
        <div
          class="trello-authorize"
          :class="{ synchronized: auth }"
          @click="authorizeTrello"
        >
          <div class="trello">
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="background"
                d="M22.4388 0H0.00657579C0.00294408 0 0 0.00294408 0 0.00657579V22.4388C0 22.4424 0.00294408 22.4453 0.00657579 22.4453H22.4388C22.4424 22.4453 22.4453 22.4424 22.4453 22.4388V0.00657579C22.4453 0.00294408 22.4424 0 22.4388 0Z"
                fill="#0079BF"
              />
              <path
                d="M17.2296 4.16455H13.4595C12.9026 4.16455 12.4512 4.61598 12.4512 5.17284V11.3979C12.4512 11.9548 12.9026 12.4062 13.4595 12.4062H17.2296C17.7864 12.4062 18.2379 11.9548 18.2379 11.3979V5.17284C18.2379 4.61598 17.7864 4.16455 17.2296 4.16455Z"
                fill="#FAFCFF"
              />
              <path
                d="M9.03036 4.16455H5.26024C4.70338 4.16455 4.25195 4.61598 4.25195 5.17284V16.1325C4.25195 16.6893 4.70338 17.1408 5.26024 17.1408H9.03036C9.58722 17.1408 10.0386 16.6893 10.0386 16.1325V5.17284C10.0386 4.61598 9.58722 4.16455 9.03036 4.16455Z"
                fill="#FAFCFF"
              />
            </svg>
            <p>Trello</p>
          </div>
          <div class="tooltip">Require synchronize Trello account</div>
        </div>
      </div>
      <div
        class="form-submit register"
        :class="{ disabled: disabledButton }"
        @click="signUp"
      >
        <input
          type="submit"
          class="submit_button"
          form="register"
          value="Register"
          :disabled="disabledButton"
        />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RegisterForm",
  data() {
    return {
      password: {
        value: "",
        isValid: false,
      },
      retypePassword: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      username: "",
      auth: false,
      errormessage: "",
      user: "",
    };
  },
  watch: {
    "password.value"(input) {
      console.log("watcher", input);
    },
  },
  computed: {
    ...mapGetters({
      getUserTrelloId: "users/getUserTrelloId",
    }),
    disabledButton() {
      return !(
        this.email.isValid &&
        this.password.isValid &&
        this.retypePassword.isValid &&
        this.username != "" &&
        this.auth
      );
    },
  },
  methods: {
    //test
    ...mapActions({ changeTrelloId: "users/changeTrelloId" }),

    authorizeTrello() {
      var authenticationSuccess = () => {
        this.auth = true;
        console.log("Successful authentication");
      };

      var authenticationFailure = function () {
        // Trello.deauthorize();
        console.log("Failed authentication");
      };

      Trello.authorize({
        type: "popup",
        name: "Tournament",
        scope: {
          read: "true",
          write: "true",
        },
        expiration: "never",
        success: authenticationSuccess,
        error: authenticationFailure,
      });
    },
    validateEmail() {
      var valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.email.value
      );
      if (valid) {
        this.email.isValid = true;
      } else {
        this.email.isValid = false;
      }
    },
    validatePass() {
      var valid =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&_]){8,}/.test(
          this.password.value
        );
      if (valid) {
        this.password.isValid = true;
      } else {
        this.password.isValid = false;
      }
    },
    validateRePass() {
      if (this.password.value == this.retypePassword.value) {
        this.retypePassword.isValid = true;
      } else {
        this.retypePassword.isValid = false;
      }
    },
    async signUp(e) {
      e.preventDefault();
      this.user = await axios.get(
        "https://api.trello.com/1/members/me?key=9a7391de8e0ad4c00e667a2e2eaa9c66&token=" +
          Trello.token()
      );
      await axios
        .post("api/v1/auth/register", {
          username: this.username,
          email: this.email.value,
          password: this.password.value,
          trelloToken: Trello.token(),
          trelloId: this.user.data["id"],
        })
        .then((response) => {
          console.log(response);
          console.log(this.user.data["id"]);
          window.location.replace("workspace");
        })
        .catch((error) => {
          console.log(error);
          this.errormessage = error.response;
        });
      console.log(Trello.token());
      Trello.deauthorize();
      console.log(Trello.token());
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/authentication.css";
</style>
