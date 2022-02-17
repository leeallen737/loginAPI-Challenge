const form = document.querySelector('form');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

const URL = 'https://reqres.in/api/login';
const USERS = 'https://reqres.in/api/users?delay=4';
let token = null;

//validation functions
const passwordCheck= (value) => {
    if(value.length < 8 || !value.match("^[#a-zA-Z0-9]+$")) {
       return true;
    }else {
        return false;
    }
}

const usernameFormValidCheck = (value) => {
    if(!value.includes('@')) {
        return true
    }else {
        return false
    }
}

//submitting the form

form.addEventListener('submit', (e) => {
    e.preventDefault();

// run validation functions with input values

    let passwordResult = passwordCheck(password.value);
    let checkEmail = usernameFormValidCheck(username.value);

    console.log(passwordResult)

    if(passwordResult === true || checkEmail === true) {
        console.log(`You need letters etc in you password and email must have '@'`)
    }else {
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({
                "email": `${checkEmail}`,
                "password": `${passwordResult}`
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()
        .then(data => {
            console.log(data.token)
            token = data.token
            
            if(token) {

                document.querySelector('body').innerHTML = `<div>LOADING......</div>`;
            }
        }).then(
            fetch(USERS).then(response => {
                response.json().then(data => {
                    
                    for (let i = 0; i <= data.data.length; i++) {

                        if(data.data[i].email === checkEmail) {
                            
                            document.querySelector('body').innerHTML = `<img src='${data.data[i].avatar}'><div>You are signed in: ${data.data[i].first_name} </div><div>Here is your token: ${token}</div>`;
                        }else {
                            document.querySelector('body').innerHTML = `<div>INVALID USER!! PLEASE WAIT FOR MORE MEMBERSHIPS TO BECOME AVAILABLE</div>`;
                        }

                    }
                })
            })
        )
        )
        
    }

})


// `@!£$%^&*()_+€#-?/[]{};:'",.<>~`) || 
// || !value.match("^[#a-fA-F0-9]+$"