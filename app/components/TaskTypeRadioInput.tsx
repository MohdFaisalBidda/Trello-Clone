import { useBearStore } from "@/store/BoardStore";
import { RadioGroup } from "@headlessui/react";
import React from "react";
import { BiSolidCheckCircle } from "react-icons/bi";

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
        <RadioGroup value={newTaskType} onChange={(e) => setNewTaskType(e)}>
          {types.map((ty) => (
            <RadioGroup.Option
              key={ty.id}
              value={ty.id}
              className={({ active, checked }) =>
                `${
                  active
                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                    : ""
                }
                ${checked ? `${ty.color} bg-opacity-75 text-white` : "bg-white"}
                relative flex cursor-pointer rounded-lg px-5 py-4 my-2 shadow-md focus:outline-none
                `
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium ${
                            checked ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {ty.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${
                            checked ? "text-white" : "text-gray-900"
                          }`}
                        >
                          <span>{ty.description}</span>
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white">
                        <BiSolidCheckCircle className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default TaskTypeRadioInput;
