
import prisma from "../prisma/prismaService";



export class UserService {


  async listAllUsers() {
    return await prisma.users.findMany();
  }

  
  async createUser( name : string) {
    return await prisma.users.create({
        data: {
          name,
        },
      }) 
  }

  async getUserById(id: string){
    return await prisma.users.findUnique({
      where: {
        id,
      }
    })
  }


  async updateUser( id: string, newName: string ){
    return await prisma.users.update({
      where: {
        id
      },
      data : {
        name: newName
      }
    })
  }

  async deleteUser( id: string) {
    return await prisma.users.delete({
      where: {
        id,
      }
    })
  }

  

}