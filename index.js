 /* sign in btn selection  */
document.getElementById('btn-sign-in').addEventListener('click', function (params) {
/* name-Input */
          const nameInput = document.getElementById('name-Input');
          const userName = nameInput.value;
 /* input password */
          const passwordInput = document.getElementById('password-Input');
          const userPassword = passwordInput.value;
/* user name and password check */
          if (userName=='admin' && userPassword=='admin123') {
                   

                   window.location.assign("home.html")
          }
          else if(userName != 'admin'){
                    alert('user not correct (admin)');
          }
          else{
                    alert('password not match (admin123)')
          }
})
