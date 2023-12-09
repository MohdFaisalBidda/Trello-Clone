import { useBearStore } from "@/store/BoardStore";
import { RadioGroup } from "@headlessui/react";
import React from "react";

const types = [
  {
    id: "todo",
    name: "Todo",
    description: "A new task to be completed",
    color: "bg-red-500",
  },
  {
    id: "inprogress",
    name: "In Progress",
    description: "A task that is currently being worked on",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    name: "Done",
    description: "A new that has been completed",
    color: "bg-green-500",
  },
];

function TaskTypeRadioInput() {
  const [newTaskType, setNewTaskType] = useBearStore((state) => [
    state.newTaskType,
    state.setNewTaskType,
  ]);
  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={newTaskType}
          onChange={(e) => setNewTaskType(e)}
        ></RadioGroup>
      </div>
    </div>
  );
}

export default TaskTypeRadioInput;
