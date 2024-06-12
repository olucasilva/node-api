import { makeMockRequest } from "../__mocks__/mockRequest.mock"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"
import { UserService } from "../services/UserService"
import { UserController } from "./UserController"
import { Request } from "express"

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    }
    const userController = new UserController(mockUserService as UserService)

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                email: 'j.doe@mail.com',
                password: '123'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'User created' })
    })

    it('should delete an user', async () => {
        const mockRequest = {
            body: {
                email: 'j.doe@mail.com'
            }
        } as Request
        const mockResponse = makeMockResponse()

        await userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'User deleted' })
    })

    it('should not delete an user', () => {
        const mockRequest = {
            body: {
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse()

        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Invalid email' })
    })    

    it('user to delete not found', () => {
        const mockRequest = {
            body: {
                email: 'j.smith@mail.com'
            }
        } as Request
        const mockResponse = makeMockResponse()

        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(404)
        expect(mockResponse.state.json).toMatchObject({ message: 'User not found' })
    })

    it('Email inválido', () => {
        const mockRequest = {
            body: {
                email: '',
                password: '123'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Invalid email' })
    })

    it('Senha inválida', () => {
        const mockRequest = {
            body: {
                email: 'j.doe@mail.com',
                password: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Invalid password' })
    })

    it('should call getAllUsers', () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()

        const getAllUsersSpy = jest.spyOn(userController, 'getAllUsers')
        userController.getAllUsers(mockRequest, mockResponse)
        expect(getAllUsersSpy).toHaveBeenCalled()
    })
})