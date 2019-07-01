// Action Creator
import axios from 'axios'
import cookies from 'universal-cookie'

const cookie = new cookies()


export const onLoginUser = (user, pass) => {
    return (dispatch) => { // dispatch adalah function
        axios.get(
            'http://localhost:2019/user',
            {
                params: {
                    username: user,
                    password: pass
                }
            }
        ).then(res => {
            // res.data = [], jumlah isi array menggunakan length
            if(res.data.length > 0){
                const {id,username} = res.data[0]

                // kirim action ke reducers, untuk disimpan usernamenya 
                dispatch(
                    {
                        type: "LOGIN_SUCCESS",
                        payload: {
                            id: res.data[0].id,
                            username: res.data[0].username
                        }
                    }
                )

                // MEMBUAT DATA UNTUK COOKIE
                cookie.set('userName', {username, id}, {path: '/'})

            } else {
                console.log('Username / Password incorrect')
            }
        })
    }

} 

export const keepLogin = (objUser) => {
    return {
        type : 'LOGIN_SUCCESS',
        payload: {
            id: objUser.id,
            username: objUser.username
        }
    }
}

export const onLogoutUser = () => {
    cookie.remove('userName')
    return {        
        type: 'LOGOUT_SUCCESS'
    }
}