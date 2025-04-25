import { saveTaskAttachment, fetchAllTasks, addTask, modifyTask, removeTask }
  from "../src/api/v1/services/taskService";
  import * as taskRepo from "../src/api/v1/repositories/taskRepository";
  

  jest.mock(
    "../src/api/v1/repositories/taskRepository",
    () => ({
      findAllTasks: jest.fn(),
      createTask:   jest.fn(),
      updateTask:   jest.fn(),
      deleteTask:   jest.fn(),
    })
  );

jest.mock("../config/firebaseConfig", (): { db: { collection: jest.Mock<any, any> } } => {
  const docMock: any = {
    id: "fakeDocId",
    set: jest.fn().mockResolvedValue(undefined),
  };

  const attachmentsDoc = jest.fn().mockReturnValue(docMock);
  const attachmentsCol = { doc: attachmentsDoc };
  docMock.collection = jest.fn().mockReturnValue(attachmentsCol);

  const projectDoc = jest.fn().mockReturnValue(docMock);
  const projectCol = { doc: projectDoc };

  const collectionMock = jest.fn().mockReturnValue(projectCol);

  return { db: { collection: collectionMock } };
});

describe("Task Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it("fetchAllTasks should return an array of tasks", async () => {
    const fakeTasks = [{ id: "1", title: "T1", description: "", projectId: "P1", status: "pending", createdAt: new Date(), updatedAt: new Date() }];
    (taskRepo.findAllTasks as jest.Mock).mockResolvedValue(fakeTasks);

    const result = await fetchAllTasks();
    expect(taskRepo.findAllTasks).toHaveBeenCalled();
    expect(result).toBe(fakeTasks);
  });

  it("addTask should apply defaults and return the new id", async () => {
    (taskRepo.createTask as jest.Mock).mockResolvedValue("newId");
    const payload = { projectId: "P1", title: "Test", description: "" };

    const id = await addTask(payload);

    expect(taskRepo.createTask).toHaveBeenCalledWith(
      expect.objectContaining({
        ...payload,
        status: "pending",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
    expect(id).toBe("newId");
  });

  it("modifyTask should call updateTask without error", async () => {
    (taskRepo.updateTask as jest.Mock).mockResolvedValue(undefined);
    await expect(modifyTask("id1", { title: "X" })).resolves.toBeUndefined();
    expect(taskRepo.updateTask).toHaveBeenCalledWith("id1", { title: "X" });
  });

  it("removeTask should call deleteTask without error", async () => {
    (taskRepo.deleteTask as jest.Mock).mockResolvedValue(undefined);
    await expect(removeTask("id2")).resolves.toBeUndefined();
    expect(taskRepo.deleteTask).toHaveBeenCalledWith("id2");
  });

  it("saveTaskAttachment should write to Firestore and return the URL", async () => {
    const url = await saveTaskAttachment("proj1", "file.txt", Buffer.from("abc"));

    expect(url).toBe("https://example.com/storage/proj1/fakeDocId/file.txt");

    const { db } = require("../config/firebaseConfig");
    expect(db.collection).toHaveBeenCalledWith("projects");
    expect(db.collection().doc).toHaveBeenCalledWith("proj1");
    expect(db.collection().doc().collection).toHaveBeenCalledWith("attachments");
    expect(db.collection().doc().collection().doc).toHaveBeenCalled();
  });
});
