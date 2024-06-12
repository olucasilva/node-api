export interface Users {
    email: string
    password: string
}

const dbUsers: Users[] = []

export class UserService {
    dbUsers: Users[]

    constructor(
        database = dbUsers
    ) {
        this.dbUsers = database
    }

    createUser = (email: string, password: string) => {
        const user = {
            email: email,
            password: password
        }
        this.dbUsers.push(user)
        console.log('Usuario adicionado', this.dbUsers);
    }

    getAllUsers = () => {
        return this.dbUsers
    }

    deleteUser = (email: string): boolean => {
        let newDbUsers = this.dbUsers.filter(o => o.email !== email)
        
        if (newDbUsers.length === this.dbUsers.length) {
            return false
        }
            
        this.dbUsers = newDbUsers
        console.log('User deleted');
        return true
    }
}