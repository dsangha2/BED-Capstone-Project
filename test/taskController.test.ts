import { Request, Response, NextFunction } from "express";
import * as taskController from "../src/api/v1/controllers/taskController";
import * as taskService from "../src/api/v1/services/taskService";
import { successResponse } from "../src/api/v1/models/responseModel";

jest.mock("../src/api/v1/services/taskService");

describe("Task Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("getAllTasks", () => {
    it("should return tasks with 200 status", async () => {
      const fakeTasks = [{ id: "1", title: "T1" }];
      (taskService.fetchAllTasks as jest.Mock).mockResolvedValue(fakeTasks);

      await taskController.getAllTasks(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(successResponse(fakeTasks));
    });

    it("should call next on error", async () => {
      (taskService.fetchAllTasks as jest.Mock).mockRejectedValue(new Error("fail"));

      await taskController.getAllTasks(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("createTask", () => {
    it("should create a task and return 201", async () => {
      (taskService.addTask as jest.Mock).mockResolvedValue("newId");
      req.body = { title: "T", description: "", projectId: "P" };

      await taskController.createTask(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(successResponse({ id: "newId" }, "Task created"));
    });

    it("should call next on error", async () => {
      (taskService.addTask as jest.Mock).mockRejectedValue(new Error("err"));
      req.body = {};

      await taskController.createTask(req as any, res as any, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("updateTask", () => {
    it("should update and return 200", async () => {
      (taskService.modifyTask as jest.Mock).mockResolvedValue(undefined);
      req.params = { id: "1" };
      req.body   = { title: "X" };

      await taskController.updateTask(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(successResponse({}, "Task updated"));
    });

    it("should call next on error", async () => {
      (taskService.modifyTask as jest.Mock).mockRejectedValue(new Error("err"));
      req.params = { id: "1" };

      await taskController.updateTask(req as any, res as any, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("deleteTask", () => {
    it("should delete and return 200", async () => {
      (taskService.removeTask as jest.Mock).mockResolvedValue(undefined);
      req.params = { id: "2" };

      await taskController.deleteTask(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(successResponse({}, "Task deleted"));
    });

    it("should call next on error", async () => {
      (taskService.removeTask as jest.Mock).mockRejectedValue(new Error("err"));
      req.params = { id: "2" };

      await taskController.deleteTask(req as any, res as any, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("attachFileToTask", () => {
    it("should attach file and return 201 + url", async () => {
      (taskService.saveTaskAttachment as jest.Mock).mockResolvedValue("http://good.url");
      req.params = { projectId: "P1" };
      req.file   = { originalname: "file.txt", buffer: Buffer.from("x") } as any;

      await taskController.attachFileToTask(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(successResponse({ url: "http://good.url" }, "Uploaded"));
    });

    it("should call next on error", async () => {
      (taskService.saveTaskAttachment as jest.Mock).mockRejectedValue(new Error("oops"));
      req.params = { projectId: "P1" };
      req.file   = { originalname: "file.txt", buffer: Buffer.from("x") } as any;

      await taskController.attachFileToTask(req as any, res as any, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
