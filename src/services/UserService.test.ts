import { UserService, Users } from "./UserService"

describe('UserService', () => {
    const mockDb: Users[] = []
    const userService = new UserService(mockDb)

    it('Deve adicionar um novo usuario', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('j.doe@mail.com', '123')
        expect(mockConsole).toHaveBeenCalledWith('Usuario adicionado', mockDb)
    })

    it('should delete an user', () => {
        const mockConsole = jest.spyOn(userService, 'deleteUser')
        userService.deleteUser('j.doe@mail.com')
        expect(mockConsole).toHaveReturnedWith(true)
    })
})