import React, {useState, useEffect, createContext} from "react";

import { auth, database } from '../services/firebaseConnectio';

//Criando a base 
import { ref, get, set } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

//Exportando o contexto
export const AuthContext = createContext({});

export default function AuthProvaider({children}){

    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    // Analisar dados
        useEffect( () => {
            async function loadDados(){
                const storageUser = await AsyncStorage.getItem('Auth_user');
    
            if(storageUser){
                setUser(JSON.parse(storageUser));
            }
            };
            //loadDados();
        },[]);
    
    // Cadastrar user
        async function signUp(nome, email, senha,){ 
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const userId = userCredential.user.uid;
    
                const dataRef = ref(database, 'usuarios/' + userId);
        
                const data = {
                    nome: nome,
                    email: email,
                    senha: senha,
                    id: userId,
                };
    
                set(dataRef, data)
                .then( () => {
                    let data = {
                        nome: nome,
                        email: email,
                        senha: senha,
                        id: userId,
                    };
                    setUser(data);
                    //storageUser(data);
                    setLoading(false);
                })
                .catch((error) => {
                    alert('erro ao salvar 1' + error);
                    setLoading(false);
                });
            })
            .catch((error) => {
                console.log('Error ao salvar2' + error);
                setLoading(false);
        })
        };

    // Logando user
        async function signIn(email, senha){
            setLoading(true);
            signInWithEmailAndPassword(auth, email, senha)
            .then( (userCredential) => {
                const user = userCredential.user.uid;
                const dataRef = ref(database, 'usuarios/' + user );

                get(dataRef)
                .then((snap) => {
                    if(snap.exists()){
                        const userData = snap.val();
                        let data = {
                            nome: userData.nome,
                            email: userData.email,
                            id: userData.id,

                        };
                        setUser(data);
                        //storageUser(data);
                        setLoading(false);
                    } else {
                        console.log('Usuario Não econtrado');
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.log('Erro ao buscar os dados' + error);
                    setLoading(false);
                });
            })
            .catch((error) => {
                console.log('Erro ao buscar os dados' + error);
                setLoading(false);
            })
        };
        
    //Deslogando os usuarios
        async function signOut(){
            signOut(database)
            .then(
                async () => {
                    await AsyncStorage.clear()
                    .then( () => {
                        setUser(null);
                        console.log('saiu');
                    })
                    .catch( (error) => {
                        console.log('Não deu' + error );
                    })
                    return;
                })
                .catch( (error) => {
                    console.log('error', error);
                    return;
                })
        };
            
    //Dados offline
    

    return(
        <AuthContext.Provider value={{ signed: !user, user, loading, signUp, signIn, signOut }} >
            {children}
        </AuthContext.Provider>
    );
}
