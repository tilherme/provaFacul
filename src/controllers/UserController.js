const mongoose = require("mongoose");
const { User } = require("../models");
const { update } = require("../models/User");

module.exports = {
  async index(request, response) {
    const usuarios = await User.find()

    return response.json(usuarios)
  },
  async show (request, response) {
    const { id } = request.params;
    var usuario = false

    if (mongoose.Types.ObjectId.isValid(id)){
      usuario = await Usuario.findById(id) 

      return response.json(usuario)
    }
    if (!usuario) {
      return response.status(404).json({ message: 'User not found!!' })
    }

  },
  async store(request, response) {
    const { name, password } = request.body;

    const usuarioExisted = await User.findOne({ name });
 
    if(usuarioExisted) return response.json(usuarioExisted)

    const createUser = { name, password }

    const usuario = await User.create(createUser);

    return response.status(201).json({ usuario })
  },
  async update(request, response){
    const { id } = request.params;
    const { name, password } = request.body;

    const usuarioExisted = await User.findById(id);

    if (usuarioExisted) {
      const usuarioAlterado = await User.findByIdAndUpdate(id, { name, password })

      return response.json(usuarioAlterado)
    }

    return response.status(404).json({ message: 'User not found!!' }) 
  },
  async destroy(request, response){
    const { id } = request.params;
    const usuarioExisted = await User.findById(id);

    if (usuarioExisted) {
      
      await User.findByIdAndDelete(id)

      return response.json({ message: 'User successfully deleted'})
    }

    return response.status(404).json({ message: 'User not found!!' }) 
  }
}