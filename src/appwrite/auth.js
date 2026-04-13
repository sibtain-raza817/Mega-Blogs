import config from '../config.js'
import { Client, Account } from 'appwrite'


export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }
}

const authservice = new AuthService();

export default AuthService