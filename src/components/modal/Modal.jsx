import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { hiddenModal } from "../../redux/slice/modal.slice";
import FormLogin from "../form/form-login";
import FormRegister from "../form/form-register";
import FormEdit from "../form/form-edit";
import FormReport from "../form/form-report";
import ReportSelect from "../select/ReportSelect";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal(props) {
  const open = useSelector((state) => state.modal.open);
  const ctx = useSelector((state) => state.modal.content);
  const content = {
    login: <FormLogin />,
    register: <FormRegister />,
    edit: <FormEdit />,
    report: <FormReport />,
    reportUpdate: <ReportSelect />,
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(hiddenModal());
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogContent>{content[ctx]}</DialogContent>
      </Dialog>
    </div>
  );
}
