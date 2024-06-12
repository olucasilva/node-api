import { Request, Response, response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    userService: UserService

    constructor(userService = new UserService()) {
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {
        const user = request.body

        if (!user.email)
            return response.status(400).json({ message: 'Invalid email' })

        if (!user.password)
            return response.status(400).json({ message: 'Invalid password' })

        this.userService.createUser(user.email, user.password)
        return response.status(201).json({ message: 'User created' })
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers()
        return response.status(200).json(users)
    }

    deleteUser = (request: Request, response: Response) => {
        const user = request.body

        if (!user.email)
            return response.status(400).json({ message: 'Invalid email' })

        const deleted = this.userService.deleteUser(user.email.toString())
        
        if(deleted)
            return response.status(200).json({ message: 'User deleted' })
        else
            return response.status(404).json({ message: 'User not found' })
    }
}
