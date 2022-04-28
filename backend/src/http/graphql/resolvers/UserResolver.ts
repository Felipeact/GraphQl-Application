import {  Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import { UserService } from "../../../services/UserService"

const userService = new UserService()

@Resolver()
export class UserResolver {

  @Query(() => [User])
  async users(){
    return userService.listAllUsers()
  }

  @Mutation(() => User)
  async createUsers(
    @Arg('name') name: string,
  ) {
    return userService.createUser(name)
  }

  @Query(() => User)
  async getUserById(
    @Arg('id') id: string,
  ) {
    return userService.getUserById(id)
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('id') id: string,
    @Arg('name') name: string,
  ) {
    return userService.updateUser(id, name)
  }

  @Mutation(() => User, { nullable: true })
  async deleteUsers(
    @Arg('id') id: string,
  ) {
    return userService.deleteUser(id)
  }


}