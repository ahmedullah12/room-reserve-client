import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type TDeletePayload = {
  title: string;
  id: string;
  method: (id: string) => void;
  isDeleted: boolean;
};

const DeleteModal = ({ title, id, method, isDeleted }: TDeletePayload) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          disabled={isDeleted}
          className={`px-2 py-1 ${
            isDeleted ? "bg-gray-300" : "bg-red-500 hover:bg-red-600"
          } text-sm text-white rounded `}
        >
          {isDeleted ? "Deleted" : "Delete"}
        </button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="mt-4 mb-2">Delete {title}</DialogTitle>
          <DialogDescription className="mb-4">
            Are you sure you want to delete this?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => method(id)}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
