const { StatusCodes } = require("http-status-codes");

const Project = require("../models/Project");

const getAllProjects = async (req, res) => {
  res.send("get all projects");
};

const getSingleProject = async (req, res) => {
  res.send("get single project");
};

const createProject = async (req, res) => {
  res.send("create project");
};

const updateProject = async (req, res) => {
  res.send("update project");
};

const deleteProject = async (req, res) => {
  res.send("delete project");
};

module.exports = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};
