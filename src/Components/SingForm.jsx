import React, { useState,  } from 'react';
import './SingForm.css';
import EnterenceButton from './EnterenceButton';


function SingForm () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
   
   

    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь вы можете выполнить проверку учетных данных пользователя
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Email:', email);
        // Ваша логика аутентификации здесь
    };



    return(
        <div  onSubmit={handleSubmit} className='sing-form'>
            
            <div className='singup'>
                <h3> Sing Up Form </h3>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='username-holder'>
                    <label htmlFor="Username">User:</label><br />
                    <input
                        className='input-field'
                        placeholder='User'
                        type="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    </div>
                    <div className='email-holder'>
                    <label htmlFor="email">Email:</label><br />
                    <input
                        className='input-field'
                        placeholder='example@gmail.com'
                        type="email"
                        id="email"
                        value={email}

                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                    <div className='password-holder'>
                    <label htmlFor="password">Password:</label><br />
                    <input
                        className='input-field'
                        placeholder='Enter your password...'
                        type="password"
                        id="password"
                        value={password}

                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div><EnterenceButton/></div>

                </form>
            
        </div>
    );
};
       


export default SingForm;