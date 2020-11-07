
const repeatPsw = document.getElementById('repeat');
const psw = document.querySelector('#psw');
const username = document.querySelector('input[name="username"]');
const email = document.querySelector('input[name="email"]');
//check if confirm password is the same
const check = function() {
    if (document.getElementById('psw').value ===
      document.getElementById('repeat').value) {
        repeatPsw.style.color = 'green';
    } else {
        repeatPsw.style.color = 'red';
        repeatPsw.setCustomValidity('Does not match password' );
    }
  }

//checks if password meets regular expression
psw.addEventListener('keyup',()=>{
    if(psw.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)){
        psw.style.color = 'green';

    }else{
        psw.style.color = 'red';

    }
})

//checks in the data base to see if username already exists
username.addEventListener('keyup',(e)=>{
        let toggler = "off";
        if(username.value.length >= 4){
            axios.get(`http://localhost:3000/api/users/username/${username.value}`)
              .then(function (response) {
                if(response.data){
                    document.querySelector('#message').innerHTML = '';
                    username.style.color = 'green';
                    username.style.backgroundColor = 'lightgreen';
                    toggler = 'ok'
                }else{
                    document.querySelector('#message').innerHTML =  'Username already exist';
                    username.style.color = 'red';
                    username.style.backgroundColor = 'lightpink';
                    toggler = 'bad';
                }
              })
              .catch(function (error) {
                console.log(`this field cannot be left in blank: ${error}`);
              });

        }else{
            document.querySelector('#message').innerHTML = 'Username should be at least three characters'
            username.style.color = 'red';
            username.style.backgroundColor = 'lightpink';
            username.addEventListener('blur', ()=>{
                if(toggler === 'off'&& username.value.length >= 4 && response.data)
                username.style.color = 'black';
                username.style.backgroundColor = 'white';
                username.style.innerHTML = '';
                toggler === 'off';
            })
        }
});

//TODO
//checks in the data base to see if email already exists
email.addEventListener('keyup',(e)=>{
            axios.get(`http://localhost:3000/api/users/email/${email.value}`)
            .then(function (response) {
                if(response.data){
                    document.querySelector('#email-message').innerHTML = '';
                    email.style.color = 'green';
                    email.style.backgroundColor = 'lightgreen';
                }else{
                    document.querySelector('#email-message').innerHTML =  'Email has an account already';
                    email.style.color = 'red';
                    email.style.backgroundColor = 'lightpink';
                }
            })
            .catch(function (error) {
                console.log(`this field cannot be left in blank: ${error}`);
            });
    });
    email.addEventListener('blur', () => {
        document.querySelector('#email-message').innerHTML =  '';

        const isValidEmail = email.value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i);
        if(!isValidEmail){
            email.style.color = 'red';
            email.style.backgroundColor = 'lightpink';
        }else{
            document.querySelector('#email-message').innerHTML = '';
            email.style.color = 'green';
            email.style.backgroundColor = 'lightgreen';
        }
    });