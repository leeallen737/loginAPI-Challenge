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
        return value;
    }
}

const usernameFormValidCheck = (value) => {
    if(!value.includes('@')) {
        return true
    }else {
        return value
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
        alert(`You need letters etc in you password and email must have '@'`)
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
            token = data.token
            
            if(token) {

                document.querySelector('body').innerHTML = `<div>LOADING......</div>`;
            }
        }).then(
            fetch(USERS).then(response => {
                response.json().then(data => {

                    
                    document.querySelector('body').innerHTML = `<div>INVALID USER!! PLEASE WAIT FOR MORE MEMBERSHIPS TO BECOME AVAILABLE</div>`;

                    data.data.forEach(person => {
                        if(person.email === checkEmail) {
                            console.log(person.email)
                            document.querySelector('body').innerHTML = `<img src='${person.avatar}'><div>You are signed in: ${person.first_name} </div><div>Here is your token: ${token}</div>`;
                            
                        }
                    })
                    // document.querySelector('body').innerHTML = `<div>INVALID USER!! PLEASE WAIT FOR MORE MEMBERSHIPS TO BECOME AVAILABLE</div>`;

                    // for (let i = 0; i < data.data.length; i++) {

                    //     if(data.data[i].email === checkEmail) {
                    //         console.log(data.data[i].email)
                    //         document.querySelector('body').innerHTML = `<img src='${data.data[i].avatar}'><div>You are signed in: ${data.data[i].first_name} </div><div>Here is your token: ${token}</div>`;
                    
                    //     }

                    // }
                })
            })
        )
        )
        
    }

})


// `@!£$%^&*()_+€#-?/[]{};:'",.<>~`) || 
// || !value.match("^[#a-fA-F0-9]+$"