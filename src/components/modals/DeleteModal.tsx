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
  isRejected?: boolean;
  isConfirmed?: boolean;
  isBooked?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DeleteModal = ({
  title,
  id,
  method,
  isDeleted,
  isRejected = true,
  isConfirmed = false,
  isBooked = false,
  open,
  setOpen,
}: TDeletePayload) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          disabled={isDeleted || !isRejected || isConfirmed || isBooked}
          className={`mt-2 md:mt-0 px-2 py-1 bg-red-500 hover:bg-red-400
           text-sm text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed`}
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
          <Button
            type="submit"
            className="bg-primary"
            onClick={() => method(id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
